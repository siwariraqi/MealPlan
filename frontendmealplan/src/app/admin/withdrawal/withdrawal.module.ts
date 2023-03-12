import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; 
import { SharedModule } from '../../shared/shared.module';
import { WithdrawalComponent } from './withdrawal.component';

export const routes: Routes = [
  { path: '', component: WithdrawalComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [WithdrawalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), 
    SharedModule
  ]
})
export class WithdrawalModule { }
