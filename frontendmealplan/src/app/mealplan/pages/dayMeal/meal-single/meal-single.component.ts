import { C } from "@angular/cdk/keycodes";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DayMeal } from "src/app/mealplan/models/DayMeal";
import { Meal } from "src/app/mealplan/models/Meal";
import { MealIngredients } from "src/app/mealplan/models/MealIngredien";
import { UserFeedback } from "src/app/mealplan/models/UserFeedback";
import { DayMealService } from "src/app/mealplan/services/day-meal.service";

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
  instruction: string;
  mealdayingridents: MealIngredients[][];
constructor(private dayMealService:DayMealService, private activatedroute:ActivatedRoute) {}

  ngOnInit() {
    this.activatedroute.params.subscribe((params)=>{
      let idx = params["id"]
      
      this.dayMealService.getDayPlanMeals(1,4).subscribe((dayMeals)=>{
        
        this.type=dayMeals[idx].type;
        this.instruction = dayMeals[idx].id.meal.instructions
       
      })
      this.dayMealService.getIngredients(1,4).subscribe((mealingridents)=>{
        this.ingredients=mealingridents[idx];
    
       
      })
      
      
    })
    this.getSelectedMeal();
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

  


  public instructions: Array<string> = []
  
  public calories: Array<number> = [25, 9, 10, 15];
}
