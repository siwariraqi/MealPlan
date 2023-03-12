import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MealplanRoutingModule } from "./mealplan-routing.module";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, HomeComponent],
  imports: [CommonModule, MealplanRoutingModule],
})
export class MealplanModule {}
