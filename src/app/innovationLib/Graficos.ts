import {AppService} from '../app.service';
import { Chart } from 'chart.js';


export class Graficos {
 
    constructor(
      private appService: AppService) { }
    
    

    // recebe o nome de uma tabela [tname], um recibiente de grafico [grafico], 
    //um tipo de grafico [tipoGrafico] e um array de dados e gera o gráfico na tela
    geraGrafico(tname: string, grafico: string, tipoGrafico: string, dataS: any){
     

      this.appService.getData(tname)
      .subscribe(data => {
        let nomes = data[tname].map(res => res.nome)
        let salario = "";
        if(tname == "clientes"){
          salario = data[tname].map(res => res.credito)
        }else{
          salario = data[tname].map(res => res.salario)
        }
        dataS = new Chart(grafico, {
          type: tipoGrafico,
          data: {
            labels: nomes,
            datasets: [
              {
                label: "Salário",
                data: salario,
                backgroundColor: [
                  "rgba(230,215,0,1)",
                  "rgba(230,200,0,1)",
                  "rgba(230,185,0,1)",
                  "rgba(230,160,0,1)",
                  "rgba(230,145,0,1)",
                  "rgba(230,130,0,1)",
                  "rgba(230,115,0,1)",
                  "rgba(230,100,0,1)",
                  "rgba(230,85,0,1)",
                ],
                borderColor: "rgba(255,50,100,1)",
                borderWidth: 2,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)"
              },
            ]
          },
          options: {
            responsive: false,
            title: {
                display: true,
                text: 'Salário dos ' + tname
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
 }
