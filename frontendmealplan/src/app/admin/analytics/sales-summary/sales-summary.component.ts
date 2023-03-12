import { Component, OnInit } from '@angular/core';
import { sales_summary } from '../analytics.data';

@Component({
  selector: 'app-sales-summary',
  templateUrl: './sales-summary.component.html',
  styleUrls: ['./sales-summary.component.scss']
})
export class SalesSummaryComponent implements OnInit { 
  public sales_summary: any[] = [];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = 'Country';
  public showYAxisLabel = true;
  public yAxisLabel = 'Sales';
  public colorScheme:any = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060']
  };  

  constructor() { 
    Object.assign(this, {sales_summary}); 
  }

  ngOnInit(): void {
  }

  public onSelect(event:any) {
    console.log(event);
  }

}
