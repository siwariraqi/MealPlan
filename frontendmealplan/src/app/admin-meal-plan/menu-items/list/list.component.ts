import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { DietType } from 'src/app/mealplan/models/DietType';
import { Meal } from 'src/app/mealplan/models/Meal';
import { AdminService } from 'src/app/mealplan/services/admin.service';
import { DayMealService } from 'src/app/mealplan/services/day-meal.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  meals: Meal[];
  meal: Meal
  displayedColumns: string[] = ['id', 'image', 'name', 'Calories', 'actions'];
  dataSource!: MatTableDataSource<Meal>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(public dayMealService: DayMealService, public adminService: AdminService, public appService: AppService) { }
  
  ngOnInit(): void {
    this.getAllMeals();
  }

  public getAllMeals() {
    this.adminService.getAllMeals().subscribe(meals => {
      this.meals = meals;
      this.initDataSource(this.meals);

    })
  }

  onMealClick(mealId: number) {
    console.log(mealId);
    for (let i = 0; i < this.meals.length; i++) {
      if (this.meals[i].mealId === mealId) {
        this.meal = this.meals[i];
        this.dayMealService.setSelectedMeal(this.meal);
        console.log(this.meal);

      }
    }
  }

  public initDataSource(data: Meal[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  public remove(meal: Meal) {
    const index: number = this.dataSource.data.indexOf(meal);
    if (index !== -1) {
      const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE');
      let dialogRef = this.appService.openConfirmDialog('', message!);
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.dataSource.data.splice(index, 1);
          this.initDataSource(this.dataSource.data);
        }
      });
    }
  }

}
