import { HttpClient } from '@angular/common/http';
import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { company } from '../company';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-company-getby-companycode',
  templateUrl: './company-getby-companycode.component.html',
  styleUrls: ['./company-getby-companycode.component.css']
})
export class CompanyGetbyCompanycodeComponent implements OnInit {

  companyCode?: any;

  companyDetails: company = new company;

  constructor(private router: Router, private httpClient: HttpClient,
    private apiService: ApiService, private route: ActivatedRoute) {
  }

  //for request param
  ngOnInit() {

    this.route.paramMap.subscribe((res: ParamMap) => {
      this.companyCode = res.get('companyCode');
    });
    
    return this.apiService.getByCompanyCode(this.companyCode).subscribe((response: any) => {
 
      this.companyDetails.companyCode = response.companyCode;
      this.companyDetails.companyName = response.companyName;
      this.companyDetails.companyOwner = response.companyOwner;
      this.companyDetails.companyTurnover = response.companyTurnover;
      this.companyDetails.website = response.website;
      this.companyDetails.companyId =response.companyId;
      // this.companyDetails.stockExchangeType = response.stockExchange;
      // this.companyDetails.latestStockPrice = response.latestStockPrice;
    });

  }

  stockForm: FormGroup = new FormGroup({
    startdate: new FormControl(null, Validators.required),
    enddate: new FormControl(null, Validators.required),
    companycode: new FormControl(null, Validators.required)
  });


  loadStockDetails() {
    this.router.navigateByUrl('getStockByDate/' + this.companyCode + '/' +  this.companyDetails.companyId);
  }

}
