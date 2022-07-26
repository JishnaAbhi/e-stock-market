import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-company-register-company',
  templateUrl: './company-register-company.component.html',
  styleUrls: ['./company-register-company.component.css']
})


export class CompanyRegisterCompanyComponent implements OnInit {

  constructor(private router: Router, private httpClient: HttpClient,
    private apiService: ApiService, private toastr: ToastrService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
  }

  companyForm: FormGroup = new FormGroup({
    companyCode: new FormControl(null, Validators.required),
    companyName: new FormControl(null, Validators.required),
    companyOwner: new FormControl(null, Validators.required),
    companyTurnOver: new FormControl(null, [Validators.min(10000000)]),
    website: new FormControl(null, Validators.required),
    stockExchange: new FormControl(0)
  });

  register() {
    this.apiService.postCompany(this.companyForm.value).subscribe(
      (response: any) => {
        this.toastr.success('Company Registered Successfully!');
        this.companyForm.reset();
      },
      (error) => {
        this.toastr.error('Something went wrong while registration!');
      }
    );
  }
}
