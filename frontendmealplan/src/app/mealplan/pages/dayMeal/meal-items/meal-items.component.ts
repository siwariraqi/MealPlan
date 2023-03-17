import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { Meal } from 'src/app/mealplan/models/Meal';

@Component({
  selector: 'app-meal-items',
  templateUrl: './meal-items.component.html',
  styleUrls: ['./meal-items.component.scss']
})
export class MealItemsComponent implements OnInit {
  @Input () mealItem!:Meal;
  @Input() menuItem!: MenuItem;
  @Input() lazyLoad: boolean = false;
  @Input() viewType: string = "grid";
  @Input() viewColChanged: any; 
  public column:number = 4;
  
  constructor(public appService:AppService) { }
  ngOnInit(): void {
    }
  }
  // public addToCart(){ 
  //   this.appService.addToCart(this.menuItem, CartOverviewComponent); 
  // }
  // public onCart(){
  //   if(this.appService.Data.cartList.find(item=>item.id == this.menuItem.id)){
  //     return true;
  //   }
  //   return false;
  // }
  // public addToFavorites(){
  //   this.appService.addToFavorites(this.menuItem);
  // }
  // public onFavorites(){
  //   if(this.appService.Data.favorites.find(item=>item.id == this.menuItem.id)){
  //     return true;
  //   }
  //   return false;
  // }


