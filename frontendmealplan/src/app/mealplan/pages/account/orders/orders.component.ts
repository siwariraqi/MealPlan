import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { OrderDetailsDialogComponent } from 'src/app/shared/order-details-dialog/order-details-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'status', 'total', 'actions'];
  dataSource!: MatTableDataSource<Order>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort ) sort!: MatSort;
  constructor(public appService:AppService) { }

  ngOnInit(): void {
    this.appService.getOrders().subscribe((res:Order[]) => { 
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });  
  }

  public remove(order:Order) { 
    const index: number = this.dataSource.data.indexOf(order);    
    if (index !== -1) {
      const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE');
			let dialogRef = this.appService.openConfirmDialog('', message!);
			dialogRef.afterClosed().subscribe(dialogResult => {
				if(dialogResult){ 
					this.dataSource.data.splice(index,1);
          this.dataSource = new MatTableDataSource<Order>(this.dataSource.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort; 
				}
			});  
    } 
  }

  public view(order:Order){ 
    const dialogRef = this.appService.openDialog(OrderDetailsDialogComponent, order, 'theme-dialog');
    dialogRef.afterClosed().subscribe(data => {  
      if(data){ 
          
      } 
    });  
  }

}
