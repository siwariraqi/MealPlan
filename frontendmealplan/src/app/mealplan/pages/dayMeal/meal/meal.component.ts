import { Component, OnInit } from '@angular/core';
import { Settings } from 'src/app/app.settings';
import { DayMeal } from 'src/app/mealplan/models/DayMeal';
import { Plan } from 'src/app/mealplan/models/Plan';
import { DayMealService } from 'src/app/mealplan/services/day-meal.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {
  public dayMeals:Array<DayMeal> =[];
  type:string;
  plan:Plan =new Plan();;
  nutritions:string[];
  dayNumber=1;
  planLength;
 
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
      this.planLength=plan.length
    })
  }
  public getDayPlanMeals(){
    this.dayMealService.getDayPlanMeals(1,1).subscribe((dayMeals)=>{
      this.dayMeals=dayMeals;
      console.log('-------------------------')
      console.log(this.dayMeals[0].id.meal.mealName)
     
    })
  }

  data = []
  totalCalories='';
 
  public getTotalDayNutrition(){
    this.dayMealService.getTotalDayNutrition(1,1).subscribe((nutritions)=>{
      this.nutritions = nutritions;
      console.log(this.nutritions);
      this.totalCalories= this.nutritions.find(item => item.includes('totalCalories')).split(':')[1]
      const newData = [];
      newData.push({
        name: 'Fat',
        value: this.nutritions.find(item => item.includes('totalFat')).split(':')[1]
      });
  
      newData.push({
        name: 'Protien',
        value: this.nutritions.find(item => item.includes('totalProtien')).split(':')[1]
      });
  
      newData.push({
        name: 'Carbs',
        value: this.nutritions.find(item => item.includes('totalCarbs')).split(':')[1]
      });
  
      newData.push({
        name: 'Fibre',
        value: this.nutritions.find(item => item.includes('totalFibre')).split(':')[1]
      });
      this.data = newData;
    });
  }

  



  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  nn='Calories';

 

  showLegend = true;
  explodeSlices = false;
  showLabels = true;
  doughnut = false;
  gradient = true;
}


