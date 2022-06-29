import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyGetAllComponent } from './company-get-all/company-get-all.component';
import { CompanyGetbyCompanycodeComponent } from './company-getby-companycode/company-getby-companycode.component';
import { CompanyRegisterCompanyComponent } from './company-register-company/company-register-company.component';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    CompanyDashboardComponent,
    CompanyRegisterCompanyComponent,
    CompanyGetAllComponent,
    CompanyGetbyCompanycodeComponent,
    StockDetailsComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()// ToastrModule added
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
