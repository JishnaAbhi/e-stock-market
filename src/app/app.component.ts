import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'e-stock-market-app';

  constructor(private router: Router) {

  }

  ngOnInit(): void {
  }

  companysearchForm: FormGroup = new FormGroup({
    companyCode: new FormControl(null, Validators.required),
  });

  appComponentForm: FormGroup = new FormGroup({});

  register() {
    this.router.navigateByUrl('registerCompany');
  }

  listAll() {
    this.router.navigateByUrl('getAllCompany');
  }

  search() {
    this.router.navigateByUrl('getByCompanyCode/' + this.companysearchForm.value.companyCode);
    this.companysearchForm.reset();
    this.appComponentForm.reset();
  }

}
