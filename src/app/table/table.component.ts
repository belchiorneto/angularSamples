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
  selected_new_table = '';
  dataSource  = [];
  dataSource2  = [];
  dataTables : any; 
  formTable: any;
  formArray: FormArray;
  camposVazios: any; // necessário para a inclusao de uma nova tupla
  textbox1 = new FormControl('');
  textbox2 = new FormControl('');

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
  // TODO: refatorar
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
       
        this.selected_new_table = tableName;
      });
      
  }

  // TODO: refatorar
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
        this.grafico.setTablename(tableName);
        this.grafico.geraGrafico();
      });
  }
  // TODO: refatorar
  updateTable(tableName){
    
    for(let i = 0; i< this.dataTables[tableName].length - 1; i++){
       for(let key in this.dataTables[tableName][i]){
        let inputValue = (document.getElementById("update_"+i+"_"+key) as HTMLInputElement).value;
      
        this.dataTables[tableName][i][key] = inputValue;
        
        
      }
    }
    this.appService.updateTable(tableName, this.dataTables[tableName])
      .subscribe(dataTables => {
        this.formTable = dataTables[tableName];
        this.formArray = this.fb.array([]); // limpa form de fields
        this.grafico.setTablename(tableName);
        this.grafico.geraGrafico();
      });
  }
  move(){
    this.textbox2.setValue(this.textbox1.value);
  }
}
