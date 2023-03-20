import { C } from "@angular/cdk/keycodes";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DayMeal } from "src/app/mealplan/models/DayMeal";
import { Meal } from "src/app/mealplan/models/Meal";
import { MealIngredients } from "src/app/mealplan/models/MealIngredien";
import { UserFeedback } from "src/app/mealplan/models/UserFeedback";
import { DayMealService } from "src/app/mealplan/services/day-meal.service";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: "app-meal-single",
  templateUrl: "./meal-single.component.html",
  styleUrls: ["./meal-single.component.scss"],
})
export class MealSingleComponent implements OnInit {

  meal:Meal;
  type:string = "";
  userFeedback: UserFeedback = new UserFeedback(); 
  ingredients: MealIngredients[];
  instructions: string;
  mealdayingridents: MealIngredients[][];
  public dayMeals:Array<DayMeal> =[];
constructor(private dayMealService:DayMealService, private activatedroute:ActivatedRoute ,private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.dayMeals=this.dayMealService.getDayMeals();
    this.getSelectedMeal();
    this.getTypeIngredientInstructions()
    
  }
  
  getTypeIngredientInstructions(){
  this.activatedroute.params.subscribe((params)=>{
    let idx = params["id"]
      this.type=this.dayMeals[idx].type;
      this.instructions = this.dayMeals[idx].id.meal.instructions
    this.dayMealService.getIngredients(1,1).subscribe((mealingridents)=>{
      this.ingredients=mealingridents[idx];
    })
  })
}


  onItFeedback(){
    this.userFeedback.isOnIt=true;
    this.dayMealService.saveFeedback(this.userFeedback,1,1).subscribe(response => {
      console.log('Feedback saved successfully:', response);
      const config = new MatSnackBarConfig();
      config.duration = 5000;
      config.panelClass = ['my-snackbar']
      this.snackBar.open('Great! enjoy your meal','close',config );
    });
  }
  getSelectedMeal() {
    this.meal=this.dayMealService.getSelectedMeal() 
  }
  
  public calories: Array<number> = [25, 9, 10, 15];
}
