import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import {FormArray, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AppService} from '../app.service';
import {Grafico} from '../innovationLib/Graficos';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})


export class TableComponent implements OnInit {
  
  dataSource  = [];
  dataSource2  = [];
  dataTables : any; 
  formTable: any;
  formArray: FormArray;
  camposVazios: any; // necessário para a inclusao de uma nova tupla

  tiposGrafico = ["line", "pie", "bar", "radar"];

  public grafico: Grafico;
  constructor(
    private appService: AppService,
    private fb: FormBuilder) { 
      this.formArray = this.fb.array([])
  }

  ngOnInit() {
    this.appService.getTableData("funcionarios")
      .subscribe(dataTables => this.dataTables = dataTables); 
  }
  
  update(){
    
  }  

  // monta um formulário editável de acordo com os valores de uma tabela
  showForm(tablename, tipoGrafico){
    this.formTable = this.appService.getTableData(tablename)
      .subscribe(dataTables => {
        this.formTable = dataTables[tablename]
        // popula o array de campos para a inclusao de novos dados
        this.camposVazios = this.formTable[this.formTable.length-1];
      });
    
    this.grafico = new Grafico(this.appService);
    this.grafico.setTipo(tipoGrafico);
    this.grafico.setReceptor("canvas_grafico");
    this.grafico.setTablename(tablename);
    this.grafico.geraGrafico();
    
  }
  geraGrafico(tipoGrafico, tablename){
    this.grafico.setTipo(tipoGrafico);
    this.grafico.setTablename(tablename);
    this.grafico.geraGrafico();
  }

  montaTableForm(qtCampos){
    this.formArray = this.fb.array([]);
    for(let i = 0; i<qtCampos; i++){
      this.formArray.push(new FormControl());
    }
  }
  // TODO: refatorar
  createTable(tableName, qtCampos){
    let fields = [];
    for(let i = 0; i<qtCampos; i++){
      let inputValue = (document.getElementById("custom_fields_"+i) as HTMLInputElement).value;
      fields.push(inputValue);
    }
    
    
    this.appService.createTable(tableName, fields)
      .subscribe(dataTables => {
        this.dataTables = dataTables;
        this.formTable = dataTables[tableName];
        this.formArray = this.fb.array([]); // limpa form de fields
        this.showForm(tableName, "");
        let tableSelect = (document.getElementById("select_tables") as HTMLInputElement);
        tableSelect.select();
      });
      
  }


  insertDados(tableName){
    let fields = [];
    for (let key in this.camposVazios) {
     
        let inputValue = (document.getElementById("inserir_"+key) as HTMLInputElement).value;
        fields.push([key, inputValue]);
     
    }
    this.appService.inserirDados(tableName, fields)
      .subscribe(dataTables => {
        this.formTable = dataTables[tableName];
        this.formArray = this.fb.array([]); // limpa form de fields
      });
    
   
  }

}
