import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  

  plan:Plan =new Plan();;
  nutritions:string[];
  dayNumber=1;
  planLength;
  
  type:string;
  public dayMeals:Array<DayMeal> =[];  

  public settings: Settings;
  constructor(private dayMealService:DayMealService,private router: Router) { 
  }
  choosenDay=1;
  ngOnInit(): void {
    
    this.getPlan();
    this.getDayPlanMeals(1,1);
    this.getTotalDayNutrition(1,1);
    
  }

 
  numDayRight() {
    if (this.choosenDay < this.planLength) {
      this.choosenDay++;
    } else {
      this.router.navigate(['/mealplan/chooseplan']);
    }
    this.getDayPlanMeals(this.choosenDay, 1);
    this.getTotalDayNutrition(this.choosenDay, 1);
    this.dayMealService.setChoosenDay(this.choosenDay);
    }
  
  
    numDayLeft(){
      if(this.choosenDay > 1){
        this.choosenDay--;
        this.getDayPlanMeals(this.choosenDay,1)
        this.getTotalDayNutrition(this.choosenDay,1);
        this.dayMealService.setChoosenDay(this.choosenDay);
      }
      }
    
  public getPlan(){
    this.dayMealService.getPlan().subscribe((plan)=>{
      this.plan=plan;
      this.planLength=plan.length;
    })
  }
  public getDayPlanMeals(dayNumber:number,userid:number){
    this.dayMealService.getDayPlanMeals(dayNumber,userid).subscribe((dayMeals)=>{
      this.dayMeals=dayMeals;
      this.dayMealService.setDayMeals(this.dayMeals);
    })
  }


  data = []
  totalCalories='';
 
  public getTotalDayNutrition(dayNumber:number,userid:number){
    this.dayMealService.getTotalDayNutrition(dayNumber,userid).subscribe((nutritions)=>{
      this.nutritions = nutritions;
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


