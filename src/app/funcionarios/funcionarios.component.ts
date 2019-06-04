import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import {AppService} from '../app.service';
import {Graficos} from '../innovationLib/Graficos';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.scss']
})


export class FuncionariosComponent extends Graficos implements OnInit {
  
  dataSource  = [];
  dataSource2  = [];
  
 
  
  constructor(
    private appService2: AppService) { 
    super(appService2);
  }

  ngOnInit() {
    this.geraGrafico("funcionarios", "canvas_funcionario", "pie", this.dataSource);
    this.geraGrafico("clientes", "canvas_clientes", "bar", this.dataSource);
    this.geraGrafico("funcionarios", "canvas_funcionario2", "line", this.dataSource);
    this.geraGrafico("clientes", "canvas_clientes2", "radar", this.dataSource);
    
  }
  @ViewChild('nome_funcionario') nome_funcionario: ElementRef;
  
  update(){
    console.log(this.nome_funcionario.nativeElement.value);
    let newNome: String = this.nome_funcionario.nativeElement.value;
   

    this.appService2.updateField("funcionarios", "nome", "3", newNome)
      .subscribe(data => {
        console.log(data);
    })
  }  
}
