import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatPaginator } from '@angular/material/paginator';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar'; 
import { Subscription } from 'rxjs/internal/Subscription';
import { filter, map } from 'rxjs/operators';
import { AppSettings, Settings } from 'src/app/app.settings';
import { DayMeal } from '../../models/DayMeal';
import { DayMealService } from '../../services/day-meal.service';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen:boolean = false;
  public showSidenavToggle:boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public psConfig: PerfectScrollbarConfigInterface = {
    wheelPropagation:true
  };  
  public menuItems: DayMeal[] = [];
  public filteredMenuItems: DayMeal[] = [];
  public categories:any[] = [];
  public allCategories:any[] = [];
  public category:string;
  public dietTypesList:string[];
  public viewType: string = 'grid';
  public searchText: string = '';
  public viewCol: number = 25;
  public count: number = 12;
  public time: string = '';
  public selectedCategoryId:number = 0;
  public message:string | null = '';
  public watcher: Subscription;
  public settings: Settings;
  public initial:string='';
  constructor(public dayMealService:DayMealService,public appSettings:AppSettings, public recipesService:RecipesService, public mediaObserver: MediaObserver) {
    this.settings = this.appSettings.settings; 
    this.watcher = mediaObserver.asObservable()
    .pipe(filter((changes: MediaChange[]) => changes.length > 0), map((changes: MediaChange[]) => changes[0]))
    .subscribe((change: MediaChange) => {
      if(change.mqAlias == 'xs') {
        this.sidenavOpen = false;
        this.showSidenavToggle = true;
        this.viewCol = 100;
      }
      else if(change.mqAlias == 'sm'){
        this.sidenavOpen = false;
        this.showSidenavToggle = true;
        this.viewCol = 50;
      }
      else if(change.mqAlias == 'md'){
        this.sidenavOpen = false;
        this.showSidenavToggle = false;
        this.viewCol = 33.3;
      }
      else{
        this.sidenavOpen = false;
        this.showSidenavToggle = false;
        this.viewCol = 25;
      }
    });


  }

  ngOnInit(): void {
    this.getDietTypes();
    this.getCategories();
    this.searchMenuItems('');
  }

  ngOnDestroy(){ 
    this.watcher.unsubscribe();
  }

  
  public getDietTypes(){
    this.recipesService.getDietTypesApi().subscribe(types=>{
      this.recipesService.setDietTypes(types);
    })
  }

  public getCategories(){
    this.recipesService.getMealsTime().subscribe(categories=>{
      this.categories = categories;
      this.allCategories = categories;
      this.initial = categories[0];
      this.recipesService.Data.categories = categories;
      this.getMenuItems(this.categories[0]);
      this.selectedCategoryId = 0;
    })
  }
   
  public selectCategory(type:any){
    this.menuItems.length = 0;
    this.category = type;
    this.getMenuItems(type);
    
    this.sidenav.close();
  }

  public onChangeCategory(event:any){ 
    if(event.value==0){
      this.selectCategory(this.initial)
    }
    this.selectCategory(event.value);

  }

  public getMenuItems(category:string){
    this.recipesService.getMealsByTime(category).subscribe(result => {
      if(result.length == 0){
        this.menuItems.length = 0;
        this.message = 'No Results Found'; 
      } 
      else{
        this.menuItems = result; 
        this.filteredMenuItems = result;
        this.dayMealService.setDayMeals( this.filteredMenuItems);
        this.category = category;
        this.message = null;
      } 
    })
  }  

  public applyFiltersToMeals(filter:any) {
    console.log(filter)
    this.time = filter.selectedDuration;
    this.dietTypesList = filter.selectedDiets;
  
    // Filter by time
    if(filter.selectedDuration == ""){
      this.filteredMenuItems = this.menuItems;
    }
    if (filter.selectedDuration == "Overnight") {
      this.filteredMenuItems = this.menuItems.filter(menuItem => {
        return menuItem.id.meal.cookTime == "Overnight" || 
          menuItem.id.meal.prepareTime == "Overnight";
      });
    } else {
      const maxTimeInMinutes = filter.selectedDuration === "Under 30 min" ? 30 : 
                               filter.selectedDuration === "Under 60 min" ? 60 : 
                               filter.selectedDuration === "Under 90 min" ? 90 : 
                               filter.selectedDuration === "Over 90 min" ?  91 : null;
      if (maxTimeInMinutes !== null) {
        this.filteredMenuItems = this.menuItems.filter(menuItem => {
          if (menuItem.id.meal.prepareTime !== "Overnight" && 
              menuItem.id.meal.cookTime !== "Overnight") {
            const prepareTimeInMinutes = menuItem.id.meal.prepareTime.match(/\d+/) ?
                                          parseInt(menuItem.id.meal.prepareTime.match(/\d+/)[0]) : 0;
            const cookTimeInMinutes = menuItem.id.meal.cookTime.match(/\d+/) ?
                                       parseInt(menuItem.id.meal.cookTime.match(/\d+/)[0]) : 0;
              if(maxTimeInMinutes==91){
                  return(prepareTimeInMinutes+cookTimeInMinutes) >= maxTimeInMinutes-1;
              }
            return (prepareTimeInMinutes + cookTimeInMinutes) < maxTimeInMinutes;
          }
          return null;
        });
      } else {
        console.log("Invalid time input:", filter.selectedDuration);
      }
    }
  
    // Filter by diet types
    if (filter.selectedDiets==null) {
      // Do nothing - don't filter by diet types
    } else {
      this.filteredMenuItems = this.filteredMenuItems.filter(menuItem => {
        const mealDietTypes = menuItem.id.meal.dietTypes.map(dietType => dietType.text);
        return filter.selectedDiets.every(dietType => mealDietTypes.includes(dietType));
      });
    }
  
    // Filter by search text
    if (!filter.searchQuery) {
      // Do nothing - don't filter by search text
    } else {
      this.filteredMenuItems = this.filteredMenuItems.filter(menuItem => {
        return menuItem.id.meal.mealName.toLowerCase().includes(filter.searchQuery.toLowerCase());
      });
    }
  //     Check if there are any results
  if (this.filteredMenuItems.length === 0) {
    this.message = 'No Results Found';
  } else {
    this.message = null;
  }
  }

  public changeDuration(time:any){    
    this.time = time; 
    if(time == "Overnight"){
      this.filteredMenuItems = this.menuItems.filter(menuItem => {
        return menuItem.id.meal.cookTime == "Overnight" || 
        menuItem.id.meal.prepareTime == "Overnight";
      })
    }else {
      const maxTimeInMinutes = time === "Under 30 min" ? 30 : time === "Under 60 min" ? 60 : time === "Under 90 min" ? 90 : null;
      if (maxTimeInMinutes !== null) {
        this.filteredMenuItems = this.menuItems.filter(menuItem => {
          if(menuItem.id.meal.prepareTime !=="Overnight" && menuItem.id.meal.cookTime !=="Overnight"){
          const prepareTimeInMinutes = menuItem.id.meal.prepareTime.match(/\d+/) ?
                                        parseInt(menuItem.id.meal.prepareTime.match(/\d+/)[0]) : 0;
          const cookTimeInMinutes = menuItem.id.meal.cookTime.match(/\d+/) ?
                                     parseInt(menuItem.id.meal.cookTime.match(/\d+/)[0]) : 0;
            return (prepareTimeInMinutes + cookTimeInMinutes) < maxTimeInMinutes;
          }
          return null;
          });
      } else {
        console.log("Invalid time input:", time);
      }
    }
  }

  public changeDietTypes(dietTypesList:string[]){    
    this.dietTypesList = dietTypesList; 
    if(dietTypesList.length==0){
      this.filteredMenuItems = this.menuItems;
      return;
    }
    else{
      console.log(this.filteredMenuItems)
      this.filteredMenuItems = this.menuItems.filter(menuItem => {
      const mealDietTypes =menuItem.id.meal.dietTypes.map(dietType => dietType.text);
      return dietTypesList.every(dietType => mealDietTypes.includes(dietType));
    });
  }
}
  

  public changeViewType(obj:any){ 
    this.viewType = obj.viewType;
    this.viewCol = obj.viewCol; 
  } 


public searchMenuItems(searchText: string) {
  if (!searchText) {
    this.filteredMenuItems = this.menuItems
  } else {
    this.filteredMenuItems = this.menuItems.filter(menuItem => {
      return menuItem.id.meal.mealName.toLowerCase().includes(searchText.toLowerCase());
    });
  }
}
} 