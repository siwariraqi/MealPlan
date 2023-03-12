import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FaqComponent } from './faq.component';

export const routes: Routes = [
  { path: '', component: FaqComponent, pathMatch: 'full'  }
]; 

@NgModule({
  declarations: [FaqComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class FaqModule { }
