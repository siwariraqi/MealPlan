import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountComponent } from "./pages/account/account.component";
import { DashboardComponent } from "./pages/account/dashboard/dashboard.component";
import { PasswordChangeComponent } from "./pages/account/password-change/password-change.component";
import { ProfileComponent } from "./pages/account/profile/profile.component";

import { GroceryListComponent } from "./components/grocery-list/grocery-list.component";
import { ChooseplanComponent } from "./pages/chooseplan/chooseplan.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { MealComponent } from "./pages/dayMeal/meal/meal.component";
import { MealSingleComponent } from "./pages/dayMeal/meal-single/meal-single.component";
import { AccountSettingsComponent } from "./pages/account/account-settings/account-settings.component";
import { HelpSupportComponent } from "./pages/account/help-support/help-support.component";
import { AboutComponent } from "./pages/account/about/about.component";
import { PrivacyComponent } from "./pages/account/privacy/privacy.component";
import { TermsComponent } from "./pages/account/terms/terms.component";
import { RecipesComponent } from "./pages/recipes/recipes.component";
import { ForgetPasswordFormComponent } from "./pages/resetpassword/forget-password-form/forget-password-form.component";
import { LogoutComponent } from "./pages/logout/logout.component";

const routes: Routes = [
  {
    path: "register",
    component: RegisterComponent,
  },
  { path: "", redirectTo: "register", pathMatch: "full" },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "forgetpassword",
    component: ForgetPasswordFormComponent,
  },
  {
    path: "chooseplan",
    component: ChooseplanComponent,
  },
  {
    path: "meals",
    component: MealComponent,
  },
  {
    path: "meals/:id",
    component: MealSingleComponent,
  },
  {
    path: "recipes",
    component: RecipesComponent,
  },
  {
    path: "account",
    component: AccountComponent,
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: DashboardComponent },
      { path: "profile", component: ProfileComponent },
      { path: "about", component: AboutComponent },
      { path: "privacy", component: PrivacyComponent },
      { path: "account-settings", component: AccountSettingsComponent },
      { path: "password-change", component: PasswordChangeComponent },
      { path: "help-support", component: HelpSupportComponent },
      { path: "terms", component: TermsComponent },
    ],
  },
  {
    path: "groceryList",
    component: GroceryListComponent,
  },
  {
    path: "logout",
    component: LogoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealplanRoutingModule {}
