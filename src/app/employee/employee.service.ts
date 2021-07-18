import { Injectable } from "@angular/core";
import { Employee } from "../model/employee.model";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { catchError } from 'rxjs/operators';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

@Injectable()
export class EmployeeService {
  constructor(private httpClient: HttpClient) { }  

   //baseUrl = 'http://localhost:3000/employees';
  baseUrl = 'http://localhost:52035/api/employees';
  //baseUrl = 'http://localhost/EmployeeService//api/employees';
  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.baseUrl)
      .pipe(catchError(this.handlError));
  }

  private handlError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side error: ', errorResponse.error.message);
    } else {
      console.error('Server Side error: ', errorResponse);
    }
    return new ErrorObservable('There is problm with the service. We are notified & working on it. Please try again later.');
  }

  			  
getEmployee(code: string): Observable<Employee> {
  return this.httpClient.get<Employee>(`${this.baseUrl}/${code}`)
    .pipe(catchError(this.handlError));
}	

  addEmployee(employee: Employee): Observable<Employee> {
    // if (employee.id === null) {
    return this.httpClient.post<Employee>(this.baseUrl, employee, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .pipe(catchError(this.handlError));
    // } else {
    //   const foundIndex = this.listEmployees.findIndex(e => e.id == employee.id);
    //   this.listEmployees[foundIndex] = employee;
    // }

    //This code is using for client side saving

    // if (employee.id === null) {
    //   const maxid = this.listEmployees.reduce(function (e1, e2) {
    //     return (e1.id > e2.id) ? e1 : e2;
    //   }).id;
    //   employee.id = maxid + 1;
    //   this.listEmployees.push(employee);
    // } else {
    //   const foundIndex = this.listEmployees.findIndex(e => e.id == employee.id);
    //   this.listEmployees[foundIndex] = employee;
    // }
  }

  updateEmployee(employee: Employee): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/${employee.code}`, employee, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handlError));
  }

  deleteEmployee(code: string) : Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${code}`)
    .pipe(catchError(this.handlError));
    }
  }
