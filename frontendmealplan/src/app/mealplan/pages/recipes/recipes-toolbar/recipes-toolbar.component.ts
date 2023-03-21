import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public counts = [8, 12, 16, 24, 36];
  public count:any;
  public sortings = ['Sort by Default', 'Prepare & Cook time', 'Diets', 'Ingredients'];
  public sort:any;

  constructor() { }

  ngOnInit() {
    this.count = this.counts[1];
    this.sort = this.sortings[0];
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
