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
  meal: Meal;
  ingredients: MealIngredients[];
  instructions: string;
  tips: string;
  keto = false;
  vegan = false;
  gluten = false;
  dairy = false;
  mealDietType: DietType[];

  constructor(private dayMealService: DayMealService, private activatedroute: ActivatedRoute, private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.getSelectedMeal();
    this.instructions = this.meal.instructions;
    this.tips = this.meal.tips;
    this.getIngredient();
    this.getMealDietType();
    this.mealDietTypeConditions();
  }

  getSelectedMeal() {
    this.meal = this.dayMealService.getSelectedMeal()
  }

  getIngredient() {
    this.activatedroute.params.subscribe((params) => {
      this.dayMealService.getIngredients(this.meal.mealId).subscribe((mealingridents) => {
        this.ingredients = mealingridents;
      })
    })
  }



  public getMealDietType() {
    this.mealDietType = this.meal.dietTypes;
  }

  public mealDietTypeConditions() {
    for (let i = 0; i < this.mealDietType.length; i++) {
      if (this.mealDietType[i].text == "KETO FRIENDLY") {
        this.keto = true;
      }
      if (this.mealDietType[i].text == "VEGAN FRIENDLY") {
        this.vegan = true;
      }
      if (this.mealDietType[i].text == "DAIRY FREE") {
        this.dairy = true;
      }
      if (this.mealDietType[i].text == "GLUTEN FREE") {
        this.gluten = true;
      }

    }
  }

}
