import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MealplanRoutingModule } from "./mealplan-routing.module";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatChipsModule } from '@angular/material/chips';
import { MealComponent } from './pages/dayMeal/meal/meal.component';
import { FormsModule } from "@angular/forms";
import { WelcomeScreenComponent } from "./components/welcome-screen/welcome-screen.component";
import { Onboarding7Component } from "./components/questions/onboarding7/onboarding7.component";
import { Onboarding8Component } from "./components/questions/onboarding8/onboarding8.component";
import { Onboarding9Component } from "./components/questions/onboarding9/onboarding9.component";
import { Onboarding10Component } from "./components/questions/onboarding10/onboarding10.component";
import { Onboarding11Component } from "./components/questions/onboarding11/onboarding11.component";
import { Onboarding12Component } from "./components/questions/onboarding12/onboarding12.component";
import { Onboarding13Component } from "./components/questions/onboarding13/onboarding13.component";
import { Onboarding14Component } from "./components/questions/onboarding14/onboarding14.component";
import { Onboarding15Component } from "./components/questions/onboarding15/onboarding15.component";
import { RegisterFormComponent } from "./components/register-form/register-form.component";
import { SharedModule } from "../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { PlanComponent } from "./components/plan/plan.component";
import { ChooseplanComponent } from "./pages/chooseplan/chooseplan.component";
import { MealItemsDetailsComponent } from './pages/dayMeal/meal-items-details/meal-items-details.component';
import { MealItemsComponent } from './pages/dayMeal/meal-items/meal-items.component';
import { MealSingleComponent } from './pages/dayMeal/meal-single/meal-single.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FeedbacksComponent } from './pages/dayMeal/feedbacks/feedbacks.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    WelcomeScreenComponent,
    Onboarding7Component,
    Onboarding8Component,
    Onboarding9Component,
    Onboarding10Component,
    Onboarding11Component,
    Onboarding12Component,
    Onboarding13Component,
    Onboarding14Component,
    Onboarding15Component,
    RegisterFormComponent,
    PlanComponent,
    ChooseplanComponent,
    MealComponent,
    MealItemsDetailsComponent,
    MealItemsComponent,
    MealSingleComponent,
    FeedbacksComponent,
    
  ],

  imports: [CommonModule, MealplanRoutingModule,
    MatCardModule,
    MatIconModule,
    FlexLayoutModule,
    SharedModule,
    MatChipsModule,FormsModule,
    NgxChartsModule
  ]
  })


  export class MealplanModule {}

