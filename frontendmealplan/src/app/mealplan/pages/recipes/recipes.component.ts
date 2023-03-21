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
  public category:string;
  public viewType: string = 'grid';
  public searchText: string = '';
  public viewCol: number = 25;
  public count: number = 12;
  public sort: string = '';
  public selectedCategoryId:number = 0;
  public message:string | null = '';
  public watcher: Subscription;
  public settings: Settings;

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
    this.getCategories();
    this.searchMenuItems('');
  }

  ngOnDestroy(){ 
    this.watcher.unsubscribe();
  }

  public getCategories(){
    this.recipesService.getMealsTime().subscribe(categories=>{
      this.categories = categories;
      // for (let i = 0; i < this.categories.length; i++) {
      //   console.log(this.categories[i]);
      // }
      this.recipesService.Data.categories = categories;
      this.getMenuItems(this.categories[0]);
      this.selectedCategoryId = 0;
    })
  } 
  public selectCategory(type:any){
    // this.selectedCategoryId = this.categories.indexOf(type);
    this.menuItems.length = 0;
    this.category = type;
    this.getMenuItems(type);
    
    this.sidenav.close();
  }
  public onChangeCategory(event:any){ 
    this.selectCategory(event.value);

  }

  public getMenuItems(category:string){
    this.recipesService.getMealsByTime(category,1).subscribe(result => {
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

  // public filterData(data:any){
  //   return this.recipesService.filterData(data, this.selectedCategoryId, this.sort, this.pagination.page, this.pagination.perPage);
  // }

  // public filterData(data){
  //   return this.appService.filterData(data, this.searchFields, this.sort, this.pagination.page, this.pagination.perPage);
  // }

  public changeCount(count:number){
    this.count = count;   
    this.menuItems.length = 0;
    // this.resetPagination();
    // this.getMenuItems();
  }
  public changeSorting(sort:any){    
    this.sort = sort; 
    this.menuItems.length = 0;
    // this.getMenuItems();
  }
  public changeViewType(obj:any){ 
    this.viewType = obj.viewType;
    this.viewCol = obj.viewCol; 
  } 


  public onPageChange(e:any){ 
    // this.pagination.page = e.pageIndex + 1;
    // this.getMenuItems();
    window.scrollTo(0,0);  
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