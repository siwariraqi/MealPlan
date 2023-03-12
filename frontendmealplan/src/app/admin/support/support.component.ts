import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator'; 
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; 
import { Order } from 'src/app/app.models';
import { AppService } from 'src/app/app.service'; 
import { OrderDetailsDialogComponent } from 'src/app/shared/order-details-dialog/order-details-dialog.component';
import { tickets } from './support-tickets';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit { 
  displayedColumns: string[] = ['code', 'supportCategoryId', 'issue', 'orderId', 'customer', 'date', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  public statuses = [
    { id: 1, name: 'In Progress' },
    { id: 2, name: 'Pending' },
    { id: 3, name: 'Solved' },
    { id: 4, name: 'Closed' } 
  ];
  public spportCategories = [
    { id: 1, name: 'Pre-Sale Question' },
    { id: 2, name: 'Order Question' },
    { id: 3, name: 'Shipping' },
    { id: 4, name: 'Product Availability' } 
  ];

  constructor(public appService:AppService) { }

  ngOnInit(): void {
    this.initDataSource(tickets);  
  }

  public initDataSource(data:any){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
  } 

  public viewOrder(orderId:number){ 
    this.appService.getOrders().subscribe((orders:Order[]) => { 
      let order = orders.find(x => x.id == orderId); 
      if(order){ 
        this.appService.openDialog(OrderDetailsDialogComponent, order, 'theme-dialog'); 
      } 
    }); 
  }

  public remove(ticket:any) {
    const index: number = this.dataSource.data.indexOf(ticket);    
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

  public reply(ticket:any){ }

}
