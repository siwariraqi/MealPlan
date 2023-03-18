import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReservationsComponent } from "../admin/reservations/reservations.component";
import { AccountComponent } from "./pages/account/account.component";
import { AddressesComponent } from "./pages/account/addresses/addresses.component";
import { DashboardComponent } from "./pages/account/dashboard/dashboard.component";
import { FavoritesComponent } from "./pages/account/favorites/favorites.component";
import { OrderComponent } from "./pages/account/orders/order/order.component";
import { OrdersComponent } from "./pages/account/orders/orders.component";
import { PasswordChangeComponent } from "./pages/account/password-change/password-change.component";
import { ProfileComponent } from "./pages/account/profile/profile.component";

import { ChooseplanComponent } from "./pages/chooseplan/chooseplan.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { MealComponent } from "./pages/dayMeal/meal/meal.component";
import { MealSingleComponent } from "./pages/dayMeal/meal-single/meal-single.component";

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
    path: "chooseplan",
    component: ChooseplanComponent,
  },
  {
    path:"meals",
    component:MealComponent,
  },
  {
    path:"meals/:id",
    component:MealSingleComponent,
  },
    {path:"account",
    component:AccountComponent,
    children: [
      { path: '', redirectTo:"dashboard",pathMatch:"full" },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'addresses', component: AddressesComponent },
      { path: 'favorites', component: FavoritesComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'password-change', component: PasswordChangeComponent },
      { path: 'reservations', component: ReservationsComponent },
      {path: 'orders/:id', component: OrderComponent}
   ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealplanRoutingModule {}
