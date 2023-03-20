import { Component, OnInit } from '@angular/core';
import { DayMealService } from 'src/app/mealplan/services/day-meal.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  
  nutritions:string[];
  constructor(private dayMealService:DayMealService) { }

  ngOnInit(): void {
    this.getTotalDayNutrition();
  }

  data = []
  totalCalories='';
 
  public getTotalDayNutrition(){
    this.dayMealService.getTotalDayNutrition(1,1).subscribe((nutritions)=>{
      this.nutritions = nutritions;
      console.log(this.nutritions);
      this.totalCalories= this.nutritions.find(item => item.includes('totalCalories')).split(':')[1]
      const newData = [];
      newData.push({
        name: 'Fat',
        value: this.nutritions.find(item => item.includes('totalFat')).split(':')[1]
      });
  
      newData.push({
        name: 'Protien',
        value: this.nutritions.find(item => item.includes('totalProtien')).split(':')[1]
      });
  
      newData.push({
        name: 'Carbs',
        value: this.nutritions.find(item => item.includes('totalCarbs')).split(':')[1]
      });
  
      newData.push({
        name: 'Fibre',
        value: this.nutritions.find(item => item.includes('totalFibre')).split(':')[1]
      });
      this.data = newData;
    });
  }
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  nn='Calories';

 

  showLegend = true;
  explodeSlices = false;
  showLabels = true;
  doughnut = false;
  gradient = true;

}
