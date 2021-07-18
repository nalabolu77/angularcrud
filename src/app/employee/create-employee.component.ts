import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Department } from '../model/dpartment.model'
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker'
import { Employee } from '../model/employee.model';
import { EmployeeService } from '../employee/employee.service'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  previewPhoto = false;
  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'IT' },
    { id: 3, name: 'HR' },
    { id: 4, name: 'Payroll' }
  ];
  employee: Employee;
  panelTitle: string;


  constructor(private _employeeService: EmployeeService,
    private _router: Router,
    private _route: ActivatedRoute) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        minDate: new Date(2018, 0, 1),
        maxDate: new Date(2018, 12, 31),
        dateInputFormat: 'DD/MM/YYYY'
      });
  }
  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }
  ngOnInit() {
    this._route.paramMap.subscribe(employeeRouteMap => {
      const code = employeeRouteMap.get('code');
      this.getEmployee(code);
    })
  }
  getEmployee(code: string) {
    if (code != null && code != "") {
      this.panelTitle = 'Edit Employee';
      this._employeeService.getEmployee(code).subscribe(
        (employee) => this.employee = employee,
        (err: any) => console.log(err)
      );
    } else {
      this.panelTitle = 'Create Employee';
      this.createEmployeeForm.reset();   
      this.employee = {
        code: null,
        name: null,
        dateOfBirth: null,
        phoneNumber: null,
        contactPreference: null,
        email: '',
        isActive: false,
        gender: null,
        department: 'select',
        photoPath: null,
        // password: null,
        // confirmPassword: null
      };         
    }
  }
  saveEmployee(): void {
    if (this.employee.code == null) {
      this._employeeService.addEmployee(this.employee).subscribe(
        (data: Employee) => {
          console.log(data);
          this.createEmployeeForm.reset();
          this._router.navigate(['list']);
        },
        (error: any) => console.log(error)
      );
    } else {
      this._employeeService.updateEmployee(this.employee).subscribe(
        () => {
          this.createEmployeeForm.reset();
          this._router.navigate(['list']);
        },
        (error: any) => console.log(error)
      );
    }
  }
}
