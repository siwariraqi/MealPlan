import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { MenuItem } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { Meal } from 'src/app/mealplan/models/Meal';
import { CartOverviewComponent } from 'src/app/shared/cart-overview/cart-overview.component';

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

  ngOnChanges(changes: {[propKey: string]: SimpleChange}){  
    if(changes.viewColChanged){
      this.getColumnCount(changes.viewColChanged.currentValue); 
    }   
  }

  public getColumnCount(value:number){
    if(value == 25){
      this.column = 4;
    }
    else if(value == 33.3){
      this.column = 3;
    }
    else if(value == 50){
      this.column = 2
    }
    else{
      this.column = 1;
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

}
