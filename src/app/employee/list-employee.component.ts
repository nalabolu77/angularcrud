import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ResolvedEmployeeList } from './resolved-employeelist.model';

@Component({
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  employees: Employee[];
  filteredEmployees: Employee[];
  error: string;

  employeeToDisplay: Employee;
  private _searchTerm: string;

  get searchTerm() {
    return this._searchTerm;
  }

  set searchTerm(val: string) {
    this._searchTerm = val;
    this.filteredEmployees = this.filtereEmployees(val);
  }

  filtereEmployees(searchString: string) {
    return this.employees.filter(employee =>
      employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  private arrayIndex = 1;
  constructor(private _router: Router, private _route: ActivatedRoute) {
    const resovedEmployeeList: ResolvedEmployeeList = this.employees = this._route.snapshot.data['employeeList'];
    if(resovedEmployeeList.error == null){
      this.employees = resovedEmployeeList.employeeList;
    }else{
      this.error = resovedEmployeeList.error;
    }
    if (this._route.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  ngOnInit() {
    // this._employeeService.getEmployees().subscribe((empList) => {
    //   this.employees = empList
    //   if (this._route.snapshot.queryParamMap.has('searchTerm')) {
    //     this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    //   } else {
    //     this.filteredEmployees = this.employees;
    //   }
    // });


    // this.employees = this._employeeService.getEmployees();
    // this.filteredEmployees = this.employees;

    // if(this._route.snapshot.queryParamMap.has('searchTerm')){
    //     this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    //   }else{
    //     this.filteredEmployees = this.employees;
    //   }

  }

  onDeleteNotification(code: string) {
    const i = this.filteredEmployees.findIndex(e => e.code === code);
    if (i !== -1) {
      this.filteredEmployees.splice(i, 1);
    }
  }
}
