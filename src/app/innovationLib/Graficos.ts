import { Injectable } from '@angular/core';
import {AppService} from '../app.service';
import { Chart } from 'chart.js';

@Injectable()
export class Grafico {
    tipo: string;
    grafico: any;
    receptor: string;
    tableName: string; 

    constructor(
      private appService: AppService) { }
    
    

    // recebe o nome de uma tabela [tname], um recibiente de grafico [grafico], 
    //um tipo de grafico [tipoGrafico] e um array de dados e gera o gráfico na tela
    geraGrafico(){
      
      this.appService.getData(this.tableName)
      .subscribe(data => {
        let locallabels = data[this.tableName].map(res => res.nome)
        let salario = "";
        if(this.tableName == "clientes"){
          salario = data[this.tableName].map(res => res.credito)
        }else{
          salario = data[this.tableName].map(res => res.salario)
        }
        this.grafico = new Chart(this.receptor, {
          type: this.tipo,
          data: {
            labels: locallabels,
            datasets: [
              {
                label: "Salário",
                data: salario,
                backgroundColor: [
                  "rgba(0,215,0,1)",
                  "rgba(0,200,0,1)",
                  "rgba(0,185,0,1)",
                  "rgba(0,160,0,1)",
                  "rgba(0,145,0,1)",
                  "rgba(0,130,0,1)",
                  "rgba(0,115,0,1)",
                  "rgba(0,100,0,1)",
                  "rgba(0,85,0,1)",
                ],
                borderColor: "rgba(0,150,0,1)",
                borderWidth: 2,
                hoverBackgroundColor: "rgba(0,250,0,0.4)",
                hoverBorderColor: "rgba(0,150,0,1)"
              },
            ]
          },
          options: {
            responsive: false,
            title: {
                display: true,
                text: 'Salário dos ' + this.tableName
            },
            legend: {
              display: true,
            },
            scales: {
              xAxes: [{
                gridLines: {
                  display:false
                }
              }],
              yAxes: [{
                stacked:true,
                gridLines: {
                  display:true,
                  color:"rgba(255,99,132,0.2)"
                }
              }]
            }
          }
        })
  
      })
    }
    setTipo(tipo: string){
      this.tipo = tipo;
    }
    setDados(grafico: any){
      this.grafico = grafico;
    }
    setReceptor(canvas: string){
      this.receptor = canvas;
    }

    setTablename(tablename: string){
      this.tableName = tablename;
    }
    reload(){
      this.grafico.type = this.tipo;
      this.geraGrafico();
      this.grafico.update();
      console.log("Recarregando grafico: " + this.grafico.type);
    }
 }
