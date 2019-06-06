import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import {AppService} from '../app.service';
import {Grafico} from '../innovationLib/Graficos';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {


  dataSource  = [];
  dataSource2  = [];
  dataTables : any; 
  formTable: any;
  tiposGrafico = ["line", "pie", "bar", "radar"];

  public grafico: Grafico;
  constructor(
    private appService: AppService) { 
    
  }

  ngOnInit() {
    this.appService.getTableData("funcionarios")
      .subscribe(dataTables => this.dataTables = dataTables); 
  }
  @ViewChild('nome_funcionario') nome_funcionario: ElementRef;
  
  update(){
    
    let newNome: String = this.nome_funcionario.nativeElement.value;
    this.appService.updateField("funcionarios", "nome", "3", newNome)
      .subscribe(data => {
        console.log(data);
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

}
