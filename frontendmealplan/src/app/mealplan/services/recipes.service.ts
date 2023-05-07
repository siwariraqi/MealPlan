import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DayMeal } from '../models/DayMeal';
import { DietType } from '../models/DietType';
import { ApiService } from './api.service';

export class Data {
    constructor(public categories: String[], 
                public dietTypesList: DietType[],
                // public orderList: Order[],
                // public favorites: MenuItem[], 
                // public totalPrice: number,
                // public totalCartCount: number
                ) { }
  }

@Injectable({
  providedIn: 'root'
})

export class RecipesService {
    public Data = new Data(
        [],  // categories 
        [],  // types
        // [],  // orderList
        // [],  // favorites 
        // 0, // totalPrice
        // 0 //totalCartCount
      )  

  GETMEALSTIME = "meals/meal-times";
  GETMEALSBYTIME = "meals/";
  GETUNITS = "meals/units";
  GETCATEGORIES = "meals/categories";
  GETDIETTYPES = "meals/diet-types";
  meal: Array<DayMeal> = [];
  private selectedMeal: any;
  selectedType:string;
  constructor(private httpClient: HttpClient, private apiService: ApiService) { }

  public getMealCategories(){
    return this.apiService.get<string[]>(this.GETCATEGORIES);
  }
  public getUnits(){
    return this.apiService.get<string[]>(this.GETUNITS);
  }
  public getMealsTime() {
    return this.apiService.get<string[]>(this.GETMEALSTIME);
  }
  public getMealsByTime(category:string) {
    return this.apiService.get<DayMeal[]>(this.GETMEALSBYTIME +`${category}`);
  }
  public getDietTypesApi() {
    return this.apiService.get<DietType[]>(this.GETDIETTYPES);
  }
  
  setDietTypes(dietTypesList:DietType[]){
    this.Data.dietTypesList=dietTypesList;
    console.log("service here")
  }
  getDietTypes(){
    return this.Data.dietTypesList;
  }
}
