import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; 
import { SharedModule } from '../../shared/shared.module'; 
import { OrdersComponent } from './orders/orders.component';
import { TransactionsComponent } from './transactions/transactions.component';

export const routes: Routes = [ 
  { path: '', redirectTo: 'orders', pathMatch: 'full'},
  { path: 'orders', component: OrdersComponent, data: { breadcrumb: 'Orders' } },
  { path: 'transactions', component: TransactionsComponent, data: { breadcrumb: 'Transactions' } } 
];

@NgModule({
  declarations: [
    OrdersComponent, 
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), 
    SharedModule
  ]
})
export class SalesModule { }
