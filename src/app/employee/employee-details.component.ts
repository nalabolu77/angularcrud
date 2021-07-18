import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { EmployeeService } from './employee.service';
import { Employee } from '../model/employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  private _code: string;
  employee: Employee;
  constructor(private _route: ActivatedRoute,
    private _employeeService: EmployeeService,
    private _router: Router) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this._code = params.get('code');
      this._employeeService.getEmployee(this._code).subscribe(
        (employee)=> this.employee = employee,
        (err: any)=> console.log(err)
      ) ;
    });

  }

  // viewNextEmployee() {
  //   if (this._code < 3) {
  //     this._code = this._id + 1;
  //   } else {
  //     this._id = 1;
  //   }
  //   this._router.navigate(['/employee', this._id],{
  //     queryParamsHandling: 'preserve'
  //   });
  // }
}
