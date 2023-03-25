import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator'; 
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; 
import { AppService } from 'src/app/app.service'; 
import { UserFeedback } from 'src/app/mealplan/models/UserFeedback';
import { AdminService } from 'src/app/mealplan/services/admin.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  feedbacks: UserFeedback[] = [];

  displayedColumns: string[] = ['image','mealName','planName','userName','date','rating','feedbackText','isOnIt'];
  dataSource!: MatTableDataSource<UserFeedback>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  
  constructor(public adminService: AdminService, public appService: AppService) { }
  
  ngOnInit(): void { 
    this.getFeedbacks();
  }

  public getFeedbacks() {
    this.adminService.getAllFeedbacks().subscribe(feedbacks => {
      this.feedbacks = feedbacks;
      this.initDataSource(this.feedbacks);
    });  
  }

  public initDataSource(data: UserFeedback[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
  } 

}
