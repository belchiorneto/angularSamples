import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from  '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':'*'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  API_URL  =  'http://localhost:8080/Api/Novo2';
  constructor(private  httpClient:  HttpClient) {}

  getFuncionarios(){
    return  this.httpClient.get(`${this.API_URL}`, httpOptions);
  }
}


