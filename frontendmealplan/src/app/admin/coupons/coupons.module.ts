import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; 
import { SharedModule } from '../../shared/shared.module';
import { CouponsComponent } from './coupons.component';
import { CouponDialogComponent } from './coupon-dialog/coupon-dialog.component';

export const routes: Routes = [
  { path: '', component: CouponsComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    CouponsComponent, 
    CouponDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class CouponsModule { }
