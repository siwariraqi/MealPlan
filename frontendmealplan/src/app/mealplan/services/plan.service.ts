import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, observable, Observable, throwError } from 'rxjs';
import { Plan } from '../models/Plan';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
  })

  export class PlanService {
    UPDATEPLAN = 'plans/getPlans';

    constructor(private http:HttpClient, private apiService:ApiService) { }
    
    getPlans(): Observable<Plan[]> {
        return this.apiService.get<Plan[]>(this.UPDATEPLAN);
    }

  }

