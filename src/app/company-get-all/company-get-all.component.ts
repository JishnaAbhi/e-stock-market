import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../service/api.service';
import { company } from '../company';
import { FormControl, FormGroup, SelectControlValueAccessor, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-get-all',
  templateUrl: './company-get-all.component.html',
  styleUrls: ['./company-get-all.component.css']
})
export class CompanyGetAllComponent implements OnInit {

  companyDetailsList: company[] = [];

  constructor(private router: Router, private httpClient: HttpClient, private apiService: ApiService,
    private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {
    this.getcompanyList();
  }

  getcompanyList(){
    return this.apiService.getAllCompany().subscribe((response: any) => {
      this.companyDetailsList =[];
      for (const res of response) {
        this.companyDetailsList.push(res);
      }
    });
  }

  delete(companyId: any) {

    if (confirm("This action will delete company and all its associated stock details! \nDo you want to proceed?")) {
      return this.apiService.deleteCompany(companyId).subscribe(
        (response: any) => {
          this.toastr.warning("Company Deleted Successfully!");
          this.getcompanyList();
        },
        (error: any) => {
          this.toastr.error("Something went wrong while deleting company details!");
          this.getcompanyList();
        });
    }

    return;
  }
}
