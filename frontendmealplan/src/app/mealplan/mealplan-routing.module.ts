import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountComponent } from "./pages/account/account.component";
import { DashboardComponent } from "./pages/account/dashboard/dashboard.component";
import { PasswordChangeComponent } from "./pages/account/password-change/password-change.component";
import { ProfileComponent } from "./pages/account/profile/profile.component";

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
      { path: 'about', component: AboutComponent },
      { path: 'privacy', component: PrivacyComponent },
      { path: 'account-settings', component: AccountSettingsComponent},
      { path: 'password-change', component: PasswordChangeComponent },
      { path: 'help-support', component: HelpSupportComponent },
      { path: 'terms', component: TermsComponent}
   ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealplanRoutingModule {}
