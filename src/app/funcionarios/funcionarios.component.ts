import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.scss']
})
export class FuncionariosComponent implements OnInit {

  dataSource  = [];
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getFuncionarios()
    .subscribe(data => {

      let salario = data
      console.log(salario)
    })
    
  }
  fetchFuncionarios(){
    this.appService.getFuncionarios().subscribe((data:  Array<object>) => {
      this.dataSource  =  data;
      console.log(data);
    });
  }

}
