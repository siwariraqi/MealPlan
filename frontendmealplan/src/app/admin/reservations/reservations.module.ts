import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ReservationsComponent } from './reservations.component';
import { DetailsDialogComponent } from './details-dialog/details-dialog.component';

export const routes: Routes = [
  { path: '', component: ReservationsComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    ReservationsComponent, 
    DetailsDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ReservationsModule { }
