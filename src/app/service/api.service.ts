import { NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { company } from '../company';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  companyUrl = 'http://localhost:8081/api/v1.0/market/company';
  stockUrl = 'http://localhost:8082/api/v1.0/market/stock';
  registerSuccess: boolean = false;
  companyResponse: company = new company;
  companyResponseList: company[] = new Array;



  constructor(private httpClient: HttpClient) {

  }

  //GET,POST,DELETE

  //registerCompany using POST
  postCompany(companyRequest: any) {
    return this.httpClient.post(this.companyUrl + '/register', companyRequest);
  }

  //get all company
  getAllCompany() {
    return this.httpClient.get(this.companyUrl + '/getall');
  }

  getByCompanyCode(companyCode: string) {
    return this.httpClient.get(this.companyUrl + '/info/' + companyCode);
  }

  getStockByDate(companyCode: string, startdate: Date, enddate: Date) {
    return this.httpClient.get(this.stockUrl + '/get/' + companyCode + '/' + startdate + '/' + enddate);
  }

  addStock(companycode: string, formData: any) {
    return this.httpClient.post(this.stockUrl + '/add/' + companycode, formData);
  }

  deleteCompany(companyCode: string) {
    return this.httpClient.delete(this.companyUrl + '/delete/' + companyCode);
  }

}
