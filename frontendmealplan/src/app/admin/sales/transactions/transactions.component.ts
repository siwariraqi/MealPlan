import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator'; 
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { transactions } from './transactions';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  displayedColumns: string[] = ['orderId', 'transactionId', 'date', 'paymentMethod', 'status', 'amount', 'view'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  
  constructor() { } 

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(transactions);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
  }

  public view(transaction:any){  

  }
  

}
