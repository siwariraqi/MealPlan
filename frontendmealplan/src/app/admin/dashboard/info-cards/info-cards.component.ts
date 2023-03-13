import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'; 
import { orders, products, customers, refunds } from '../dashboard.data';

@Component({
  selector: 'app-info-cards',
  templateUrl: './info-cards.component.html',
  styleUrls: ['./info-cards.component.scss']
})
export class InfoCardsComponent implements OnInit { 
  public orders: any[] = [];
  public products: any[] = [];
  public customers: any[] = [];
  public refunds: any[] = [];
  public colorScheme:any = {
    domain: ['rgba(255,255,255,0.8)']
  }; 
  public autoScale = true;
  @ViewChild('resizedDiv') resizedDiv!:ElementRef;
  public previousWidthOfResizedDiv:number = 0; 
 
  constructor(){ }

  ngOnInit(){
    this.orders = orders;
    this.products = products;
    this.customers = customers;
    this.refunds = refunds;
    this.orders = this.addRandomValue('orders');     
    this.customers = this.addRandomValue('customers');
  }
  
  public onSelect(event:any) {
    console.log(event);
  }

  public addRandomValue(param:string) {
    switch(param) {
      case 'orders':
        for (let i = 1; i < 30; i++) { 
          this.orders[0].series.push({"name": 1980+i, "value": Math.ceil(Math.random() * 1000000)});
        } 
        return this.orders;
      case 'customers':
        for (let i = 1; i < 15; i++) { 
          this.customers[0].series.push({"name": 2000+i, "value": Math.ceil(Math.random() * 1000000)});
        } 
        return this.customers;
      default:
        return this.orders;
    }
  }

  ngOnDestroy(){
    this.orders[0].series.length = 0;
    this.customers[0].series.length = 0;
  }

  ngAfterViewChecked() {    
    if(this.previousWidthOfResizedDiv != this.resizedDiv.nativeElement.clientWidth){
      setTimeout(() => this.orders = [...orders] ); 
      setTimeout(() => this.products = [...products] ); 
      setTimeout(() => this.customers = [...customers] ); 
      setTimeout(() => this.refunds = [...refunds] );
    }
    this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
  }

}