import { Component, Input, OnInit } from '@angular/core';
import { Meal } from 'src/app/mealplan/models/Meal';
import { DayMealService } from 'src/app/mealplan/services/day-meal.service';
import { DayMeal } from 'src/app/mealplan/models/DayMeal';
import { DietType } from 'src/app/mealplan/models/DietType';


@Component({
  selector: 'app-meal-items',
  templateUrl: './meal-items.component.html',
  styleUrls: ['./meal-items.component.scss']
})
export class MealItemsComponent implements OnInit {
  @Input() lazyLoad: boolean = false;
  @Input () dayItem!:DayMeal;
  @Input() viewType: string = "grid";
  @Input() viewColChanged: any; 
  @Input () mealindex:number
  meal:Meal
  type: string;
  mealItem:Meal;
  mealDietType:DietType[];

  public column:number = 4;
  
  constructor(private dayMealService:DayMealService) { }
  ngOnInit(): void {
    this.mealType();
    }
     
    public mealType (){
      this.type=this.dayItem.type;
      this.mealItem=this.dayItem.id.meal;
      this.mealDietType=this.dayItem.id.meal.dietTypes;  
      this.dayMealService.setMealDietType(this.mealDietType);
    }
    onMealClick(mealId: number) {
      if(this.mealItem.mealId === mealId){
        this.meal = this.mealItem;
        this.dayMealService.setSelectedMeal(this.meal);
      }
    }

    
    
  }



