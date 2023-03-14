import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MealplanRoutingModule } from "./mealplan-routing.module";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuItemsComponent } from './pages/dayMeal/menu-items/menu-items.component';
import { MenuItemsCarouselComponent } from './pages/dayMeal/menu-items-carousel/menu-items-carousel.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';
import { MatChipsModule } from '@angular/material/chips';
import { MealComponent } from './pages/dayMeal/meal/meal.component';
@NgModule({
  declarations: [LoginComponent, RegisterComponent, HomeComponent, MenuItemsComponent, MenuItemsCarouselComponent, MealComponent],
  imports: [CommonModule, MealplanRoutingModule,
    MatCardModule,
    MatIconModule,
    FlexLayoutModule,
    SharedModule,
    MatChipsModule


  ],
})
export class MealplanModule {}
