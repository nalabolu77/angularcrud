import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Employee } from '../model/employee.model';
import { Observable } from 'rxjs/Observable';
import { EmployeeService } from './employee.service';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { ResolvedEmployeeList } from './resolved-employeelist.model';

@Injectable()
export class EmployeeListResolverService implements Resolve<ResolvedEmployeeList>{
    constructor(private _employeeService: EmployeeService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedEmployeeList> {
        return this._employeeService.getEmployees()
            .pipe(
                map((employeeList) => new ResolvedEmployeeList(employeeList)),
                catchError((err: any) => Observable.of(new ResolvedEmployeeList(null, err)))
            );
    }
}