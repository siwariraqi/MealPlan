import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Meal } from 'src/app/mealplan/models/Meal';
import { Router } from '@angular/router';
import { DayMealService } from 'src/app/mealplan/services/day-meal.service';


@Component({
  selector: 'app-meal-items',
  templateUrl: './meal-items.component.html',
  styleUrls: ['./meal-items.component.scss']
})
export class MealItemsComponent implements OnInit {
  meal:Meal;
  @Input () mealItem!:Meal;
  @Input() lazyLoad: boolean = false;
  @Input() viewType: string = "grid";
  @Input() viewColChanged: any; 
  public column:number = 4;
  
  constructor(private dayMealService:DayMealService) { }
  ngOnInit(): void {
    }

    onMealClick(mealId: number) {
      if(this.mealItem.mealId === mealId){
        this.meal = this.mealItem;
        console.log('iiiiiiiiiiiiiiiiiiiii')
        console.log(this.meal)
        this.dayMealService.setSelectedMeal(this.meal);
        // this.router.navigate(['/mealplan/meals', this.meal.mealId], { state: { meal: this.meal } });
      }
    }
    
  }



