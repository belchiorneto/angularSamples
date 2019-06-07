import { Injectable,  } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule,  } from  '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':'*'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  API_URL  =  'http://localhost:8080/TesteTomcat/Api';
  constructor(private  httpClient:  HttpClient) {}

  getData(tableName: String){
    return  this.httpClient.get(`${this.API_URL}`, httpOptions);
  }
  
  
  getTableData (tableName: string): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}`, httpOptions);
      
  }

  createTable(tableName: String, fields){
   
    return  this.httpClient.post(`${this.API_URL}`,
    {
      operacao: "addTable",
      valores: {
        table: tableName,
        campos: fields
      }
    } , httpOptions);
   
  }

  inserirDados(tableName, fields){
    return  this.httpClient.post(`${this.API_URL}`,
    {
      operacao: "inserirDados",
      table: tableName,
      valores: {
        table: tableName,
        campos: fields
      }
    } , httpOptions);
  }
  updateField(tableName: String, fieldName: String, identification: String, newValue: String){
   
    return  this.httpClient.post(`${this.API_URL}`,
    {
      operacao: "updateTable",
      tabela: tableName,
      campo: fieldName,
      newvalue: newValue,
      id: identification
    } , httpOptions);
   
  }
}


