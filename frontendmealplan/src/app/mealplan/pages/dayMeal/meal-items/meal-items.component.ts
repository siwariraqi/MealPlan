import { Component, Input, OnInit } from '@angular/core';
import { Meal } from 'src/app/mealplan/models/Meal';
import { DayMealService } from 'src/app/mealplan/services/day-meal.service';
import { DayMeal } from 'src/app/mealplan/models/DayMeal';


@Component({
  selector: 'app-meal-items',
  templateUrl: './meal-items.component.html',
  styleUrls: ['./meal-items.component.scss']
})
export class MealItemsComponent implements OnInit {
  meal:Meal
  type: string;
  mealItem:Meal;
  @Input () dayItem!:DayMeal;
  @Input() lazyLoad: boolean = false;
  @Input() viewType: string = "grid";
  @Input() viewColChanged: any; 
  public column:number = 4;
  
  constructor(private dayMealService:DayMealService) { }
  ngOnInit(): void {
    this.mealType();
    }
     
    public mealType (){
      this.type=this.dayItem.type;
      this.dayMealService.setType(this.type);
      this.mealItem=this.dayItem.id.meal;
    }
    onMealClick(mealId: number) {
      if(this.mealItem.mealId === mealId){
        this.meal = this.mealItem;
        this.dayMealService.setSelectedMeal(this.meal);
      }
    }
    
  }



