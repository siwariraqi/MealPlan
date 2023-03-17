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
  // public slides = []; 
  // public specialMenuItems:Array<MenuItem> = [];
  public bestMenuItems:Array<MenuItem> = [];
  // public todayMenu!:MenuItem;
  public settings: Settings;
  constructor(private dayMealService:DayMealService, public appSettings:AppSettings, public appService:AppService ) {
    this.settings = this.appSettings.settings;  
  }
  ngOnInit(): void {
    this.getPlan();
    this.getDayPlanMeals();
    this.getTotalDayNutrition();
    // this.getSlides();
    // this.getSpecialMenuItems();
    this.getBestMenuItems();
    // this.getTodayMenu();
  }
  public getPlan(){
    this.dayMealService.getPlan(1).subscribe((plan)=>{
      this.plan=plan;
      // console.log('----------------------------------------------')
      // console.log(this.plan);
    })
  }
  public getDayPlanMeals(){
    this.dayMealService.getDayPlanMeals(1,1).subscribe((meals)=>{
      this.meals=meals;
      console.log('----------------------------------------------')
      console.log(this.meals);
    })
  }
 
  public getTotalDayNutrition(){
    this.dayMealService.getTotalDayNutrition(1,1).subscribe((nutritions)=>{
      this.nutritions=nutritions;
      // console.log('----------------------------------------------')
      // console.log(this.nutritions);
    })
  } 
  // public getSlides(){
  //   this.appService.getHomeCarouselSlides().subscribe((res:any)=>{
  //     this.slides = res;
  //   });
  // }
 
  // public getSpecialMenuItems(){
  //   this.appService.getSpecialMenuItems().subscribe(menuItems=>{
  //     this.specialMenuItems = menuItems;
  //   });
  // } 
  public getBestMenuItems(){
    this.appService.getBestMenuItems().subscribe(menuItems=>{
      this.bestMenuItems = menuItems;
      console.log('----------------------------------------------')
      console.log(this.bestMenuItems);
    });
  }
  // public getTodayMenu(){
  //   this.appService.getMenuItemById(23).subscribe(data=>{ 
  //     this.todayMenu = data;  
  //   });
  // } 

}
