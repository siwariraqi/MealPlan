import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { AppSettings, Settings } from 'src/app/app.settings';
import { Meal } from 'src/app/mealplan/models/Meal';
import { Plan } from 'src/app/mealplan/models/Plan';
import { DayMealService } from 'src/app/mealplan/services/day-meal.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {
  public meals:Array<Meal> =[];
  plan:Plan =new Plan();;
  nutritions:string[];
 
  public settings: Settings;
  constructor(private dayMealService:DayMealService) { 
  }
  ngOnInit(): void {
    this.getPlan();
    this.getDayPlanMeals();
    this.getTotalDayNutrition();

  }
  public getPlan(){
    this.dayMealService.getPlan(1).subscribe((plan)=>{
      this.plan=plan;
    })
  }
  public getDayPlanMeals(){
    this.dayMealService.getDayPlanMeals(1,1).subscribe((meals)=>{
      this.meals=meals;
    })
  }
 
  public getTotalDayNutrition(){
    this.dayMealService.getTotalDayNutrition(1,1).subscribe((nutritions)=>{
      this.nutritions=nutritions;
    })
  } 
   

}
