import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DietType } from 'src/app/mealplan/models/DietType';
import { RecipesService } from 'src/app/mealplan/services/recipes.service';

@Component({
  selector: 'app-recipes-toolbar',
  templateUrl: './recipes-toolbar.component.html',
  styleUrls: ['./recipes-toolbar.component.scss']
})
export class RecipesToolbarComponent implements OnInit {
  @Input() showSidenavToggle:boolean = false;
  @Output() onSidenavToggle: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChangeCount: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChangeSorting: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChangeViewType: EventEmitter<any> = new EventEmitter<any>();
  public selectedIngredients: string = '';
  public selectedDiet: string = '';
  public selectedDuration: string = '';

  public viewType: string = 'grid';
  public types:DietType[] = this.recipesService.Data.dietTypesList;
  public viewCol: number = 25;
  public counts = [8, 12, 16, 24, 36];
  public count:any;
  public sortings = ['Prepare & Cook time', 'Diets', 'Ingredients'];
  public times = ['Under 30 min','Under 60 min','under 90 min','Overnight'];
  public sort:any;

  constructor(public recipesService:RecipesService) { }

  ngOnInit() {
    this.count = this.counts[1];
    this.sort = this.sortings[0];
    this.types = this.recipesService.Data.dietTypesList;
    for (let i = 0; i < this.types.length; i++) {
        console.log(this.types[i]);
      }
  }

  ngOnChanges(){
    // console.log(' show toggle - ' ,this.showSidenavToggle)
  }

  public changeSorting(sort:string){
    this.sort = sort;
    this.onChangeSorting.emit(sort);
  }

  public changeViewType(viewType:any, viewCol:any){
    this.viewType = viewType;
    this.viewCol = viewCol;
    this.onChangeViewType.emit({viewType:viewType, viewCol:viewCol});
  }

  public sidenavToggle(){
    this.onSidenavToggle.emit();
  }

}
