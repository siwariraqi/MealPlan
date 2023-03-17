import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { MenuItem } from "src/app/app.models";
import { AppService } from "src/app/app.service";
import { AppSettings, Settings } from "src/app/app.settings";
import { Meal } from "src/app/mealplan/models/Meal";
import { DayMealService } from "src/app/mealplan/services/day-meal.service";

@Component({
  selector: "app-meal-single",
  templateUrl: "./meal-single.component.html",
  styleUrls: ["./meal-single.component.scss"],
})
export class MealSingleComponent implements OnInit {
  meal:Meal;
  // public mealItem!: Meal;

  // private sub: any;
  // public menuItem!: MenuItem;
  // public settings: Settings;
  // public quantityCount: number = 1;
  // public relatedMenuItems: Array<MenuItem> = [];
  
constructor(private dayMealService:DayMealService) {}

  // constructor(
  //   public dayMealService:DayMealService,

  //   public appSettings: AppSettings,
  //   public appService: AppService,
  //   private activatedRoute: ActivatedRoute,
  //   public fb: UntypedFormBuilder,
  //   public snackBar: MatSnackBar
  // )
  //  {
  //   this.settings = this.appSettings.settings;
  // }

  ngOnInit() {
    this.getSelectedMeal();
    console.log("sssssssssssssssssss")
    console.log(this.meal)
    // this.sub = this.activatedRoute.params.subscribe((params) => {
    //   this.getMenuItemById(params["id"]);
    // });
    // this.getRelatedMenuItems();
  }
  getSelectedMeal() {
    this.meal=this.dayMealService.getSelectedMeal() 
  }
/////////////////////////////////////////////////
//   public getDayPlanMealByID(){
//     this.dayMealService.getMealById(1, 1, 1).subscribe(
//       (meal: Meal) => {
//         console.log('Meal retrieved:', meal);
//       },
//       (error: any) => {
//         console.error('Error retrieving meal:', error);
//       }
//     );
// }
//////////////////////////////////////////////////////////
  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }

  // public getMenuItemById(id: number) {
  //   const index: number = this.appService.Data.cartList.findIndex(
  //     (item) => item.id == id
  //   );
  //   if (index !== -1) {
  //     this.menuItem = this.appService.Data.cartList[index];
  //     this.quantityCount = this.menuItem.cartCount;
  //   } else {
  //     this.appService.getMenuItemById(id).subscribe((data) => {
  //       this.menuItem = data;
  //     });
  //   }
  // }

  // public counterChange(count: number) {
  //   this.quantityCount = count;
  // }

  // public addToCart() {
  //   this.menuItem.cartCount = this.quantityCount;
  //   if (this.menuItem.cartCount <= this.menuItem.availibilityCount) {
  //     const index: number = this.appService.Data.cartList.findIndex(
  //       (item) => item.id == this.menuItem.id
  //     );
  //     index !== -1
  //       ? (this.appService.Data.cartList[index] = this.menuItem)
  //       : this.appService.addToCart(this.menuItem, null);
  //     this.appService.calculateCartTotal();
  //   } else {
  //     this.menuItem.cartCount = this.menuItem.availibilityCount;
  //     this.snackBar.open(
  //       "You can not add more items than available. In stock " +
  //         this.menuItem.availibilityCount +
  //         " items and you already added " +
  //         this.menuItem.cartCount +
  //         " item to your cart",
  //       "×",
  //       { panelClass: "error", verticalPosition: "top", duration: 5000 }
  //     );
  //   }
  // }

  // public addToFavorites() {
  //   this.appService.addToFavorites(this.menuItem);
  // }

  // public getRelatedMenuItems() {
  //   this.appService.getMenuItems().subscribe((data) => {
  //     this.relatedMenuItems = this.appService.shuffleArray(data).slice(0, 8);
  //   });
  // }
}
