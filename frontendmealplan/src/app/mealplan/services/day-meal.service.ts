import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { DayMeal } from '../models/DayMeal';
import { Meal } from '../models/Meal';
import { MealIngredients } from '../models/MealIngredien';
import { Plan } from '../models/Plan';
import { UserFeedback } from '../models/UserFeedback';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DayMealService {
  GETDAYPLANMEAL_URL = "plans/day-plan-meals/";
  PLAN_URL = "plans/";
  DAYNUTRITION_URL = "plans/day-nutrition/";
  SAVEFEEDBACK_URL = "feedback/save/";
  INGREDIENTS_URL ="plans/ingredinets"
  meal: Array<Meal> = [];
  private selectedMeal: any;
  selectedType:string;
  constructor(private httpClient: HttpClient, private apiService: ApiService) { }

  public getDayPlanMeals(dayNumber: number, userid: number) {
    return this.apiService.get<DayMeal[]>(this.GETDAYPLANMEAL_URL + `${dayNumber}` + '/' + `${userid}`);
  }
  public getPlan(userid: number) {
    return this.apiService.get<Plan>(this.PLAN_URL + `${userid}`);
  }
  public getTotalDayNutrition(dayNumber: number, userid: number) {
    return this.apiService.get<string[]>(this.DAYNUTRITION_URL + `${dayNumber}` + '/' + `${userid}`);
  }

  public saveFeedback(userFeedback: UserFeedback, userId: number, mealId: number) {
    return this.apiService.post<UserFeedback>(this.SAVEFEEDBACK_URL + `${userId}` + '/' + `${mealId}`, userFeedback);
  }
  public getIngredients(mealIds: number[]) {
    const requestBody = JSON.stringify({ mealIds: mealIds });
    console.log(requestBody)
    return this.apiService.get<string[]>(this.INGREDIENTS_URL, null, requestBody);
  }
  
  public testGetIngredients() {
    const mealIds = [1, 2, 3];
    this.getIngredients(mealIds).subscribe(
      (result) => {
        console.log('Success:', result);
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }


  setSelectedMeal(meal: any) {
    this.selectedMeal = meal;
  }
  getSelectedMeal() {
    return this.selectedMeal;
  }

  setType(type: string) {
    console.log('tttttttttttttt')
    console.log(type)
    this.selectedType = type;
  }
  getType() {
    return this.selectedType;
  }




}
