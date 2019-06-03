import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {Graficos} from '../innovationLib/Graficos';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.scss']
})
export class FuncionariosComponent implements OnInit {

  dataSource  = [];
  dataSource2  = [];
  
  constructor(private appService: AppService) { }

  ngOnInit() {
    new Graficos(this.appService).geraGrafico("funcionarios", "canvas_funcionario", "pie", this.dataSource);
    new Graficos(this.appService).geraGrafico("funcionarios", "canvas_clientes", "bar", this.dataSource);
  }
   
}
