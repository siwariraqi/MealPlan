import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { TermsConditionsComponent } from './terms-conditions.component';

export const routes: Routes = [
  { path: '', component: TermsConditionsComponent, pathMatch: 'full'  }
];

@NgModule({
  declarations: [TermsConditionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class TermsConditionsModule { }
