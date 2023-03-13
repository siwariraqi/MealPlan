import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator'; 
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { OrderDetailsDialogComponent } from 'src/app/shared/order-details-dialog/order-details-dialog.component';
import { refunds } from './refunds';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss']
})
export class RefundComponent implements OnInit {
  displayedColumns: string[] = ['requestId', 'orderId', 'storeId', 'amount', 'type', 'reason', 'date', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  public stores = [
    { id: 1, name: 'Store 1' },
    { id: 2, name: 'Store 2' }
  ];

  constructor(public appService:AppService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(refunds);
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

  public approve(item:any){ }

  public reject(item:any){ }

}
