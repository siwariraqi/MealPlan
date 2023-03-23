import { C } from "@angular/cdk/keycodes";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DayMeal } from "src/app/mealplan/models/DayMeal";
import { Meal } from "src/app/mealplan/models/Meal";
import { MealIngredients } from "src/app/mealplan/models/MealIngredien";
import { UserFeedback } from "src/app/mealplan/models/UserFeedback";
import { DayMealService } from "src/app/mealplan/services/day-meal.service";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { DietType } from "src/app/mealplan/models/DietType";

@Component({
  selector: "app-meal-single",
  templateUrl: "./meal-single.component.html",
  styleUrls: ["./meal-single.component.scss"],
})
export class MealSingleComponent implements OnInit {
  grid='grid';
  meal:Meal;
  type:string = "";
  userFeedback: UserFeedback = new UserFeedback(); 
  ingredients: MealIngredients[];
  instructions: string;
  tips:string;
  public dayMeals:Array<DayMeal> =[];
  dayNumber:number
  keto=true;
  vegan=true;
  gluten=true;
  dairy=true;
  mealDietType:DietType[];
constructor(private dayMealService:DayMealService, private activatedroute:ActivatedRoute ,private snackBar: MatSnackBar) {}
mealID:number
  ngOnInit() {
    this.dayNumber=this.dayMealService.getChoosenDay();
    this.dayMeals=this.dayMealService.getDayMeals();
    console.log(this.dayMeals);
    this.getSelectedMeal();
    this.getTypeIngredientInstructions()
    this.mealID=this.meal.mealId;
    this.getMealDietType();
    this.mealDietTypeConditions();
    
    
  }
  
  getTypeIngredientInstructions(){
  this.activatedroute.params.subscribe((params)=>{
    let idx = params["id"]
      this.type=this.dayMeals[idx].type;
      this.instructions = this.dayMeals[idx].id.meal.instructions
      this.tips=this.dayMeals[idx].id.meal.tips
    this.dayMealService.getIngredients(this.meal.mealId).subscribe((mealingridents)=>{
      this.ingredients=mealingridents;
    })
  })
}


  onItFeedback(){
    this.userFeedback.isOnIt=true;
    this.dayMealService.saveFeedback(this.userFeedback,1,this.meal.mealId).subscribe(response => {
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
  
 

  public getMealDietType () {
    this.mealDietType=this.dayMealService.getMealDietType();
  }

  public mealDietTypeConditions(){
    for(let i=0;i<this.mealDietType.length;i++)
    {
    if(this.mealDietType[i].text=="keto"){
      this.keto=true;
    }
    if(this.mealDietType[i].text=="vegan"){
      this.vegan=true;
    }
    if(this.mealDietType[i].text=="gluten"){
      this.gluten=true;
    }
    if(this.mealDietType[i].text=="dairy"){
      this.dairy=true;
    }
  }
  }
}
