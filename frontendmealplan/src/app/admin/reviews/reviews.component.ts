import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator'; 
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; 
import { AppService } from 'src/app/app.service'; 
import { reviews } from './reviews';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  displayedColumns: string[] = ['statusId', 'image', 'author', 'menuItem', 'comment', 'rating', 'date', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  public statuses = [ 
    { id: 1, name: 'Approved' },
    { id: 2, name: 'Pending' }
  ];

  constructor(public appService:AppService) { }

  ngOnInit(): void { 
    this.initDataSource(reviews);  
  }

  public initDataSource(data:any){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
  } 

  public unApprove(review:any){  
    const index: number = this.dataSource.data.findIndex(x => x.id == review.id); 
    if(index !== -1){
      review.statusId = 2; 
      this.dataSource.data[index] = review;
    } 
  }

  public remove(review:any) {
    const index: number = this.dataSource.data.indexOf(review);    
    if (index !== -1) {
      const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE');
			let dialogRef = this.appService.openConfirmDialog('', message!);
			dialogRef.afterClosed().subscribe(dialogResult => {
				if(dialogResult){ 
          this.dataSource.data.splice(index,1);
          this.initDataSource(this.dataSource.data); 
				}
			});  
    } 
  } 

}
