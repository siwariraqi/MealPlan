import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; 
import { SharedModule } from '../../shared/shared.module'; 
import { CustomersComponent } from './customers.component';
import { CustomerDialogComponent } from './customer-dialog/customer-dialog.component';

export const routes: Routes = [
  { path: '', component: CustomersComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule 
  ]
})
export class CustomersModule { }
