import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { most_viewed_products } from '../analytics.data';

@Component({
  selector: 'app-most-viewed-products',
  templateUrl: './most-viewed-products.component.html',
  styleUrls: ['./most-viewed-products.component.scss']
})
export class MostViewedProductsComponent implements OnInit {
  public data: any[] = []; 
  public showLegend = false;
  public gradient = true;
  public colorScheme:any = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#42A5F5', '#7E57C2', '#AFB42B']
  }; 
  public showLabels = true;
  public explodeSlices = true;
  public doughnut = false; 
  @ViewChild('resizedDiv') resizedDiv!:ElementRef;
  public previousWidthOfResizedDiv:number = 0; 
  
  constructor() { }

  ngOnInit(){
    this.data = most_viewed_products;  
  }
  
  public onSelect(event:any) {
    console.log(event);
  }

  ngAfterViewChecked() {    
    if(this.previousWidthOfResizedDiv != this.resizedDiv.nativeElement.clientWidth){
      setTimeout(() => this.data = [...most_viewed_products] );
    }
    this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
  }

}
