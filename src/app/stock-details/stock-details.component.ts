import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../service/api.service';
import { stock } from '../stock';
import { stockDetails } from '../stockDetails';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css'],
  
})
export class StockDetailsComponent implements OnInit {

  companyCode!: any;
  startdate!: any;
  enddate!: any;
  companyId!: any;


  stockResponse: stockDetails = new stockDetails;
  stocksList: stock[] = [];
  addStock: stock={};

  stockAddForm: FormGroup = new FormGroup({
    stockPrice: new FormControl(null, Validators.required),
    // companycode: new FormControl(null, Validators.required)
  });


  constructor(private router: Router, private httpClient: HttpClient, private apiService: ApiService,
    private route: ActivatedRoute, private toastr: ToastrService,
    public datePipe: DatePipe) { }



  ngOnInit() {
debugger;
    this.route.paramMap.subscribe((req: ParamMap) => {
      this.companyCode = req.get('companyCode');
      this.startdate = req.get('startdate');
      this.enddate = req.get('enddate');
      this.companyId = req.get('companyId');
    })

    return this.apiService.getStockByDate(this.companyCode, this.startdate,
      this.enddate).subscribe((response: any) => {
        debugger;
        this.stocksList = response;
        this.stockResponse.minStockPrice =  this.stocksList?.map(x => x.stockPrice ?? 0)?.reduce((a,b)=>Math.min(a, b)) ?? 0; 
        this.stockResponse.maxStockPrice =  this.stocksList?.map(x => x.stockPrice ?? 0)?.reduce((a,b)=>Math.max(a, b)) ?? 0;  
        this.stockResponse.avgStockPrice =Math.round((this.stocksList?.map(x => x.stockPrice ?? 0)?.reduce((a, b)=>a + b))/ this.stocksList?.length) ?? 0;
      });

  }

  
  add() {

    this.stockAddForm.setValue({ stockPrice: this.stockAddForm.value.stockPrice
      // , companyCode: this.companyCode
    });

    // const formData = new FormData();
    // formData.append('stockPrice', this.stockAddForm.value.stockPrice);
    // formData.append('companycode', this.companyCode);

    this.addStock.stockPrice =  this.stockAddForm.value.stockPrice;
    this.addStock.companyId =  parseInt(this.companyId);
    this.addStock.startDate =  new Date();
    this.addStock.endDate =  new Date();

    return this.apiService.addStock(this.addStock).subscribe(
      (response: any) => {
        this.showSuccess();
        window.location.reload();
      },
      (error: any) => {
        this.showError();
        window.location.reload();
      }
    );
  }

  showSuccess() {
    this.toastr.success('Stock Details Added Successfully!');
  }

  showError() {
    this.toastr.error('Something went wrong while adding Stock!')
  }

}
