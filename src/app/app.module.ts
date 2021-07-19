import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SelectRquiredValidatorDirective } from '../app/shared/select-required-validator.directive'
import { ConfirmEqualValidatorDirective } from '../app/shared/confirm-equal-validator.directive'
import { EmployeeService } from '../app/employee/employee.service'
import { CreateEmployeeCanDeactivateGuardService } from '../app/employee/create-employee-can-deactivate.guard.service'


import { AppComponent } from './app.component';
import { ListEmployeeComponent } from './employee/list-employee.component';
import { CreateEmployeeComponent } from './employee/create-employee.component';
import { DisplayemployeeComponent } from './employee/displayemployee.component';
import { EmployeeDetailsComponent } from './employee/employee-details.component';
import { EmployeeFilterPipe } from './employee/empolyee-filter.pipe';
import { EmployeeListResolverService } from './employee/employee-list-resolver.service';
import { PagenotfoundComponent } from './pagenotfound.component';
import { EmployeeDetailsGuardService } from './employee/employee-details-guard.service';
import { AccordianComponent } from './shared/accordian.component';
import { EmployeeloginComponent } from './employee/employeelogin.component';

const appRoutes: Routes = [
  {
    path: 'list',
    component: ListEmployeeComponent,
    resolve: { employeeList: EmployeeListResolverService }
  },
  {
    path: 'edit/:code',
    component: CreateEmployeeComponent,
    //canDeactivate: [CreateEmployeeCanDeactivateGuardService]
  },
  {
    path: 'employee/:code', component: EmployeeDetailsComponent,
    //canActivate: [EmployeeDetailsGuardService]
  },
  { path: 'notfound', component: PagenotfoundComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeeComponent,
    CreateEmployeeComponent,
    SelectRquiredValidatorDirective,
    ConfirmEqualValidatorDirective,
    DisplayemployeeComponent,
    EmployeeDetailsComponent,
    EmployeeFilterPipe,
    PagenotfoundComponent,
    AccordianComponent,
    EmployeeloginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [EmployeeService, CreateEmployeeCanDeactivateGuardService,
    EmployeeListResolverService, EmployeeDetailsGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
