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
  @Output() onDurationChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDietChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChangeViewType: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSearchQuery: EventEmitter<string> = new EventEmitter<string>();
  @Output() onFiltersChanged: EventEmitter<any> = new EventEmitter<any>(); // new output event

  public selectedDiets: string[];
  public selectedDuration: string = '';
  public viewType: string = 'grid';
  public viewCol: number = 25;

  public searchQuery: string = '';
  public types:DietType[];
  public sortings = ['Prepare & Cook time', 'Diets'];
  public times = ['Under 30 min','Under 60 min','Under 90 min','Over 90 min','Overnight'];

  constructor(public recipesService:RecipesService) { }

  ngOnInit() {
    this.getDietTypes();
    this.types = this.recipesService.getDietTypes();
  }

  public getDietTypes(){
    this.recipesService.getDietTypesApi().subscribe(types=>{
      this.recipesService.setDietTypes(types);
    })
  }

  public changeViewType(viewType:any, viewCol:any){
    this.viewType = viewType;
    this.viewCol = viewCol;
    this.onChangeViewType.emit({viewType:viewType, viewCol:viewCol});
  }

  public sidenavToggle(){
    this.onSidenavToggle.emit();
  }

  public changeTime(){
    this.emitFiltersChanged(); 
  }

  public changeDiets(){
    this.emitFiltersChanged(); 
  }

  public resetFilters() {
    this.selectedDuration = '';
    this.selectedDiets = [];
    this.searchQuery = '';
    this.onDurationChange.emit(this.selectedDuration);
    this.onDietChange.emit(this.selectedDiets);
    this.onSearchQuery.emit('');
    this.emitFiltersChanged(); 
  }

  public onSearch() {
    this.emitFiltersChanged(); 
  }

  private emitFiltersChanged() {
    this.onFiltersChanged.emit({
      selectedDiets: this.selectedDiets,
      selectedDuration: this.selectedDuration,
      searchQuery: this.searchQuery
    });
  }
}
