import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealplanRoutingModule } from './mealplan-routing.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MealplanRoutingModule
  ]
})
export class MealplanModule { }
