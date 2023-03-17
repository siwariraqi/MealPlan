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
  @Input() lazyLoad: boolean = false;
  @Input() viewType: string = "grid";
  @Input() viewColChanged: any; 
  public column:number = 4;
  
  constructor(public appService:AppService) { }
  ngOnInit(): void {
    console.log('print meals')
    console.log(this.mealItem)
    }
  }



