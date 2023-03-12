import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  displayedColumns: string[] = ['id', 'date', 'status.name', 'total', 'action', 'view'];
  dataSource!: MatTableDataSource<Order>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  public statuses = [
    { id: 1, name: 'Completed' },
    { id: 2, name: 'Processing' },
    { id: 2, name: 'On Hold' },
    { id: 2, name: 'Refunded' },
    { id: 2, name: 'Pending' }
  ];
  constructor(public appService:AppService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.appService.getOrders().subscribe((orders:Order[]) => { 
      this.initDataSource(orders);
    });  
  }

  public initDataSource(data:any){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    (this.dataSource.sortingDataAccessor as any) = (data:any, sortHeaderId: string) => {
      return this.getPropertyByPath(data, sortHeaderId);
    };
  }

  getPropertyByPath(obj: Object, pathString: string) {
    return pathString.split('.').reduce((o:any, i) => o[i], obj);
  }

  public onStatusSelectionChange(event:any, order:Order){  
    if(event.value){ 
      const index: number = this.dataSource.data.indexOf(order);    
      if(index !== -1) { 
        this.dataSource.data.find(item => item.id == order.id)!.status = event.value;  
        this.initDataSource(this.dataSource.data);
        this.snackBar.open('Order status updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      }  
    }
  }

  public view(order:Order){ 
    const dialogRef = this.appService.openDialog(OrderDetailsDialogComponent, order, 'theme-dialog');
    dialogRef.afterClosed().subscribe(data => {  
      if(data){ 
          
      } 
    });  
  }

  public receipt(order:Order){ 
     
  } 
   

}
