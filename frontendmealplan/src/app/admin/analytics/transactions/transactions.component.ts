import { Component } from '@angular/core';
import { transactions } from '../analytics.data';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent { 
  public transactions: any[] = [];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = 'Store';
  public showYAxisLabel = true;
  public yAxisLabel = 'Transactions';
  public colorScheme:any = {
    domain: ['#3F51B5', '#E91E63', '#43A047', '#FDD835', '#F4511E', '#606060']
  };   

  constructor() { 
    Object.assign(this, {transactions}); 
  }
  
  public onSelect(event:any) {
    console.log(event);
  }

}
