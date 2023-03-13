import { Component } from '@angular/core';
import { daily_views_stats } from '../analytics.data';

@Component({
  selector: 'app-daily-views-stats',
  templateUrl: './daily-views-stats.component.html',
  styleUrls: ['./daily-views-stats.component.scss']
})
export class DailyViewsStatsComponent { 
  public daily_views_stats: any[] = [];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = 'Days';
  public showYAxisLabel = true;
  public yAxisLabel = 'Views';
  public colorScheme:any = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060']
  }; 
  public autoScale = true; 
  
  constructor() { 
    Object.assign(this, {daily_views_stats})   
  }
  
  onSelect(event:any) {
    console.log(event);
  }

}
