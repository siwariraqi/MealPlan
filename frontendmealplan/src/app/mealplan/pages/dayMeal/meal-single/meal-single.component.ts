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
  userFeedback: UserFeedback = new UserFeedback(); 
constructor(private dayMealService:DayMealService) {}

  ngOnInit() {
    this.getType();
    this.getSelectedMeal();
    this.userFeedback.rating=1;
    this.userFeedback.isOnIt=true;
    this.userFeedback.rating=3;
    this.userFeedback.feedbackText='very bad';
    this.saveFeedback();
  }
  saveFeedback(){
    this.dayMealService.saveFeedback(this.userFeedback,1,1).subscribe(response => {
      console.log('Feedback saved successfully:', response);
    });
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