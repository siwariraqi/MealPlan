import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Meal } from '../models/Meal';
import { Plan } from '../models/Plan';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DayMealService {
  GETDAYPLANMEAL_URL="users/day-plan-meals/";
  PLAN_URL="users/plan/";
  DAYNUTRITION_URL="users/day-nutrition/";
  meal: Array<Meal> = [];
  constructor(private httpClient: HttpClient,private apiService:ApiService) {}
   
  public getDayPlanMeals(dayNumber:number,userid:number) {
    return this.apiService.get<Meal[]>(this.GETDAYPLANMEAL_URL+`${dayNumber}`+'/'+`${userid}`);
  }
  public getPlan(userid:number) {
    return this.apiService.get<Plan>(this.PLAN_URL+`${userid}`);
  }
  public getTotalDayNutrition(dayNumber:number,userid:number) {
    return this.apiService.get<string[]>(this.DAYNUTRITION_URL+`${dayNumber}`+'/'+`${userid}`);
  }  

}
