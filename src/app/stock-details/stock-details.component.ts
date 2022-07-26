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
  fromDate!: any;
  toDate!: any;
  companyId!: any;


  stockResponse: stockDetails = new stockDetails;
  stocksList: stock[] = [];
  addStock: stock = {};

  stockAddForm: FormGroup = new FormGroup({
    stockPrice: new FormControl(null, Validators.required),
    startDate: new FormControl(null, Validators.required),
    endDate: new FormControl(null, Validators.required),
    // companycode: new FormControl(null, Validators.required)
  });


  constructor(private router: Router, private httpClient: HttpClient, private apiService: ApiService,
    private route: ActivatedRoute, private toastr: ToastrService,
    public datePipe: DatePipe) { }



  ngOnInit() {
    let date: Date = new Date();
    this.fromDate = this.datePipe.transform((date), 'yyyy-MM-dd');
    this.toDate = this.datePipe.transform((new Date(date.setDate(date.getDate() + 60))), 'yyyy-MM-dd');
    this.route.paramMap.subscribe((req: ParamMap) => {
      this.companyCode = req.get('companyCode');
      //  this.startdate = req.get('startdate');
      // this.enddate = req.get('enddate');
      this.companyId = req.get('companyId');
    })

    this.getstockdatas();
  }
  getstockdatas() {
    return this.apiService.getStockByDate(this.companyCode, this.fromDate,
      this.toDate).subscribe((response: any) => {
        this.stocksList = [];
        this.stocksList = response;
        this.stockResponse.minStockPrice = this.stocksList?.map(x => x.stockPrice ?? 0)?.reduce((a, b) => Math.min(a, b)) ?? 0;
        this.stockResponse.maxStockPrice = this.stocksList?.map(x => x.stockPrice ?? 0)?.reduce((a, b) => Math.max(a, b)) ?? 0;
        this.stockResponse.avgStockPrice = Math.round((this.stocksList?.map(x => x.stockPrice ?? 0)?.reduce((a, b) => a + b)) / this.stocksList?.length) ?? 0;
      });

  }

  add() {

    this.stockAddForm.setValue({
      stockPrice: this.stockAddForm.value.stockPrice,
      startDate: this.stockAddForm.value.startDate,
      endDate: this.stockAddForm.value.endDate
    });

    this.addStock.stockPrice = this.stockAddForm.value.stockPrice;
    this.addStock.companyId = parseInt(this.companyId);
    this.addStock.startDate = this.stockAddForm.value.startDate;
    this.addStock.endDate = this.stockAddForm.value.endDate;

    return this.apiService.addStock(this.addStock).subscribe(
      (response: any) => {
        this.toastr.success('Stock Details Added Successfully!');
        this.stockAddForm.reset();
        this.getstockdatas();
      },
      (error: any) => {
        this.toastr.error('Something went wrong while adding Stock!');
      }
    );
  }
}
