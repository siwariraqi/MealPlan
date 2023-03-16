import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Meal } from '../models/Meal';
import { Plan } from '../models/Plan';

@Injectable({
  providedIn: 'root'
})
export class DayMealService {
  GETDAYPLANMEAL_URL="users/day-plan-meals/";
  PLAN_URL="users/plan/";
  DAYNUTRITION_URL="users/day-nutrition/";
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
  
  
  // public AddUserInfo(userInfo: UserInfo) {
  //   return this.httpClient.post<UserInfo>(this.POSTNEWUSER_URL, userInfo, {
  //     withCredentials: false,
  //   });
  // }

  // public UpdateUserInfo(userinfo: UserInfo) {
  //   return this.httpClient.put<UserInfo>(this.PUTUPDATE_URL, userinfo, {
  //     withCredentials: false,
  //   });
  // }
}
