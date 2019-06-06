import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import {FormArray, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AppService} from '../app.service';
import {Grafico} from '../innovationLib/Graficos';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.scss']
})


export class FuncionariosComponent implements OnInit {
  registrationForm: FormGroup;
  dataSource  = [];
  dataSource2  = [];
  dataTables : any; 
  formTable: any;
  formArray: FormArray;
  tiposGrafico = ["line", "pie", "bar", "radar"];

  public grafico: Grafico;
  constructor(
    private appService: AppService,
    private fb: FormBuilder) { 
      this.formArray = this.fb.array([])
  }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      formArray: this.fb.array([])
    })
    this.appService.getTableData("funcionarios")
      .subscribe(dataTables => this.dataTables = dataTables); 
  }
  @ViewChild('nome_funcionario') nome_funcionario: ElementRef;
  
  update(){
    
    let newNome: String = this.nome_funcionario.nativeElement.value;
    this.appService.updateField("funcionarios", "nome", "3", newNome)
      .subscribe(data => {
       
    })
  }  

  // monta um formulário editável de acordo com os valores de uma tabela
  showForm(tablename, tipoGrafico){
    this.formTable = this.appService.getTableData(tablename)
      .subscribe(dataTables => this.formTable = dataTables[tablename]);
    
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
  createTable(tableName){
   
    let inputValue = (document.getElementById("custom_fields_0") as HTMLInputElement).value;
      console.log(inputValue); 
      
   
  }

}
