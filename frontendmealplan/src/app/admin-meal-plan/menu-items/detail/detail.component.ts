import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { DayMeal } from 'src/app/mealplan/models/DayMeal';
import { DietType } from 'src/app/mealplan/models/DietType';
import { Meal } from 'src/app/mealplan/models/Meal';
import { MealIngredients } from 'src/app/mealplan/models/MealIngredien';
import { UserFeedback } from 'src/app/mealplan/models/UserFeedback';
import { DayMealService } from 'src/app/mealplan/services/day-meal.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  mealEmpty=false;

  grid='grid';
  meal:Meal;
  type:string = "";
  userFeedback: UserFeedback = new UserFeedback(); 
  ingredients: MealIngredients[];
  instructions: string;
  tips:string;
  public dayMeals:Array<DayMeal> =[];
  dayNumber:number
  keto=false;
  vegan=false;
  gluten=false;
  dairy=false;
  mealDietType:DietType[];
constructor(private dayMealService:DayMealService, private activatedroute:ActivatedRoute ,private snackBar: MatSnackBar) {}
mealID:number
  ngOnInit() {
    this.getSelectedMeal();
    if (this.MealIsEmpty()) {
      this.mealEmpty = true;
     }
  

    this.instructions=this.meal.instructions;
    this.tips=this.meal.tips;
    this.getIngredient();

    this.dayNumber=this.dayMealService.getChoosenDay();
    this.dayMeals=this.dayMealService.getDayMeals();

    // this.getTypeIngredientInstructions()
    this.mealID=this.meal.mealId;
    this.getMealDietType();
    this.mealDietTypeConditions();
  }

  getSelectedMeal() {
    this.meal=this.dayMealService.getSelectedMeal() 
  }
  public MealIsEmpty() {
    const mealValues = Object.values(this.meal);
    return mealValues.every(value => !value);
}
  
  getIngredient(){
  this.activatedroute.params.subscribe((params)=>{
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

  
  public getMealDietType () {
    this.mealDietType=this.meal.dietTypes;
  }

  public mealDietTypeConditions(){
    for(let i=0;i<this.mealDietType.length;i++)
    {
    if(this.mealDietType[i].text=="KETO FRIENDLY"){
      this.keto=true;
    }
    if(this.mealDietType[i].text=="VEGAN FRIENDLY"){
      this.vegan=true;
    }
    if(this.mealDietType[i].text=="DAIRY FREE"){
      this.dairy=true;
    }
    if(this.mealDietType[i].text=="GLUTEN FREE"){
      this.gluten=true;
    }
   
  }
  }
  // private sub: any;
  // public menuItem!: MenuItem;
  // constructor(public appService:AppService, private activatedRoute: ActivatedRoute) { }

  // ngOnInit(): void {
  //   this.getCategories();
  //   this.sub = this.activatedRoute.params.subscribe(params => {  
  //     if(params['id']){
  //       this.getMenuItemById(params['id']); 
  //     } 
  //     else{
  //       this.getMenuItemById(20); 
  //     }
  //   }); 
  // }

  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // } 

  // public getCategories(){
  //   if(!this.appService.Data.categories.length){
  //     this.appService.getCategories().subscribe(categories=>{ 
  //       this.appService.Data.categories = categories;
  //     });
  //   } 
  // } 

  // public getMenuItemById(id:number){ 
  //   this.appService.getMenuItemById(id).subscribe(data=>{ 
  //     this.menuItem = data;  
  //   }); 
  // }

}
