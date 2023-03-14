import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MealComponent } from "./pages/dayMeal/meal/meal.component";
import { MenuItemsCarouselComponent } from "./pages/dayMeal/menu-items-carousel/menu-items-carousel.component";
import { MenuItemsComponent } from "./pages/dayMeal/menu-items/menu-items.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path:"menu-items",
    component:MenuItemsComponent,
  },
  {
    path:"menu-items-carousel",
    component:MenuItemsCarouselComponent
  },
  {
    path:"meal",
    component:MealComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealplanRoutingModule {}
