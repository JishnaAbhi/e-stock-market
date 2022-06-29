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
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {

  companyCode!: any;
  startdate!: any;
  enddate!: any;


  stockResponse: stockDetails = new stockDetails;
  stocksList: stock[] = [];

  stockAddForm: FormGroup = new FormGroup({
    stockPrice: new FormControl(null, Validators.required),
    companycode: new FormControl(null, Validators.required)
  });


  constructor(private router: Router, private httpClient: HttpClient, private apiService: ApiService,
    private route: ActivatedRoute, private toastr: ToastrService) { }



  ngOnInit() {

    this.route.paramMap.subscribe((req: ParamMap) => {
      this.companyCode = req.get('companyCode');
      this.startdate = req.get('startdate');
      this.enddate = req.get('enddate');
    })

    return this.apiService.getStockByDate(this.companyCode, this.startdate,
      this.enddate).subscribe((response: any) => {
        this.stockResponse.minStockPrice = response.minStockPrice;
        this.stockResponse.maxStockPrice = response.maxStockPrice;
        this.stockResponse.avgStockPrice = response.avgStockPrice;
        this.stockResponse.stocks = response.stocks;
        this.stocksList = this.stockResponse.stocks;
      });

  }

  add() {

    this.stockAddForm.setValue({ stockPrice: this.stockAddForm.value.stockPrice, companycode: this.companyCode });

    const formData = new FormData();
    formData.append('stockPrice', this.stockAddForm.value.stockPrice);
    formData.append('companycode', this.companyCode);

    return this.apiService.addStock(this.companyCode, formData).subscribe(
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
