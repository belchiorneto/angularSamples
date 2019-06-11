import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { FormControl } from '@angular/forms';


const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':'*'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TextBoxService {
  API_URL  =  'http://localhost:8080/teste2/Api';
 
  constructor(private  httpClient:  HttpClient) { }

  moveControl<FormControl>(formControl1: FormControl, formControl2: FormControl){
    let retorno = new FormControl('');
    
    let form1 = formControl1;
    let form2 = formControl2;
    let value1 = form1.value;
    console.log(value1);
    return this.httpClient.post(`${this.API_URL}`, 
    {
     
      operacao: "move", 
      valores: {
        table: "funcionarios",
        valor: value1
      }
    },httpOptions);
  }
}
