import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealplanRoutingModule {}
