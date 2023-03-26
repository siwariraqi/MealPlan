import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { DayMeal } from '../models/DayMeal';
import { DietType } from '../models/DietType';
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
  PLAN_URL = "plans";
  DAYNUTRITION_URL = "plans/day-nutrition/";
  SAVEFEEDBACK_URL = "feedback/save/";
  INGREDIENTS_URL ="plans/ingredients/"
  meal: Array<Meal> = [];
  private selectedMeal: any;
  selectedType:string;
  public dayMeals:Array<DayMeal> =[];
  mealingridents: MealIngredients[][];
  mealDietType:DietType[];
  constructor(private httpClient: HttpClient, private apiService: ApiService) { }

  public getDayPlanMeals(dayNumber: number, userid: number) {
    return this.apiService.get<DayMeal[]>(this.GETDAYPLANMEAL_URL + `${dayNumber}`  );
  }
  public getPlan(userid: number) {
    return this.apiService.get<Plan>(this.PLAN_URL );
  }
  public getTotalDayNutrition(dayNumber: number, userid: number) {
    return this.apiService.get<string[]>(this.DAYNUTRITION_URL  + `${dayNumber}`  );
  }

  public saveFeedback(userFeedback: UserFeedback, userId: number, mealId: number) {
    return this.apiService.post<UserFeedback>(this.SAVEFEEDBACK_URL + `${mealId}`, userFeedback);
  }

  
  public getIngredients(mealId: number) {
    return this.apiService.get<MealIngredients[]>(this.INGREDIENTS_URL + `${mealId}`);
  }
  
  
  setDayMeals(dayMeals:DayMeal[]){
    this.dayMeals=dayMeals;
  }

  getDayMeals(){
    return this.dayMeals;
  }
  

  setSelectedMeal(meal:any) {
    this.selectedMeal = meal;
  }
  getSelectedMeal() {
    return this.selectedMeal;
  }

  // setType(type: string) {

  //   this.selectedType = type;
  // }
  // getType() {
  //   return this.selectedType;
  // }

  selectedDay:number

  setChoosenDay(day: number) {
    this.selectedDay = day;
  }
  getChoosenDay() {
    return this.selectedDay;
  }

  setMealDietType(type: DietType[]) {

    this.mealDietType = type;
  }
  getMealDietType() {
    return this.mealDietType;
  }




}
