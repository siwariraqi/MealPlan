import { Component, OnInit } from "@angular/core";
import { Meal } from "src/app/mealplan/models/Meal";
import { UserFeedback } from "src/app/mealplan/models/UserFeedback";
import { DayMealService } from "src/app/mealplan/services/day-meal.service";

@Component({
  selector: "app-meal-single",
  templateUrl: "./meal-single.component.html",
  styleUrls: ["./meal-single.component.scss"],
})
export class MealSingleComponent implements OnInit {
  meal:Meal;
  type:string='x';
  
constructor(private dayMealService:DayMealService) {}

  ngOnInit() {
    this.getType();
    this.getSelectedMeal();
    console.log(this.meal);
  }

  getSelectedMeal() {
    this.meal=this.dayMealService.getSelectedMeal() 
  }
  getType(){
    this.type=this.dayMealService.getType();
  }

  


  public instructions: Array<string> = ["this is instructions......"];
  public ingredients: Array<string> = [
    "4 Cups unsweetened almond milk",
    "4.5 oz peanut butter",
    "1.25 cup chia seeds",
    "4 bananas - sliced",
  ];
  public calories: Array<number> = [25, 9, 10, 15];
}
