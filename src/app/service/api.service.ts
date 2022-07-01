import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { company } from '../company';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  companyUrl = 'https://localhost:44381/api/v1.0/market/Company';
  stockUrl = 'https://localhost:44320/api/v1.0/market/CompanyEStock';
  registerSuccess: boolean = false;
  companyResponse: company = new company;
  companyResponseList: company[] = new Array;



  constructor(private httpClient: HttpClient) {

  }

  //GET,POST,DELETE

  //registerCompany using POST
  postCompany(company: any) {
    return this.httpClient.post(this.companyUrl + '/register', company);
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

  deleteCompany(id: string) {
    return this.httpClient.delete(this.companyUrl + '/Delete/' + id);
  }

}
