import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Employee } from '../model/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-displayemployee',
  templateUrl: './displayemployee.component.html',
  styleUrls: ['./displayemployee.component.css']
})
export class DisplayemployeeComponent implements OnInit {
  @Input() employee: Employee;
  @Input() searchTerm: string;
  @Output() notifyDelete: EventEmitter<string> = new EventEmitter<string>();
  confirmDelete = false;

  public selectedEmployeeId: string;
  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _employeeService: EmployeeService) { }

  ngOnInit() {
    this.selectedEmployeeId = this._route.snapshot.paramMap.get('code');
  }

  viewEmployee() {
    this._router.navigate(['/employee', this.employee.code], {
      queryParams: { 'searchTerm': this.searchTerm }
    });
  }

  editEmployee() {
    this._router.navigate(['/edit', this.employee.code]);
  }

  deleteEmployee() {
    this._employeeService.deleteEmployee(this.employee.code).subscribe(
      ()=>console.log('Employee with Id=${employee.id} delete'),
      (err) => console.log(err)
    );
    this.notifyDelete.emit(this.employee.code);
  }
}
