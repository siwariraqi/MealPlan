import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

import { PagesComponent } from "./pages/pages.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { LockScreenComponent } from "./pages/lock-screen/lock-screen.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      //{ path: '', redirectTo: '/landing', pathMatch: 'full' },
      {
        path: "mealplan",
        loadChildren: () => import("./mealplan/mealplan.module").then((m) => m.MealplanModule),
      },
      {
        path: "",
        // loadChildren: () => import("./pages/home/home.module").then((m) => m.HomeModule),
        redirectTo: "mealplan",
        pathMatch: "full",
      },
      {
        path: "about",
        loadChildren: () => import("./pages/about/about.module").then((m) => m.AboutModule),
      },
      {
        path: "contact",
        loadChildren: () => import("./pages/contact/contact.module").then((m) => m.ContactModule),
      },
      {
        path: "menu",
        loadChildren: () => import("./pages/menu/menu.module").then((m) => m.MenuModule),
      },
      {
        path: "chefs",
        loadChildren: () => import("./pages/chefs/chefs.module").then((m) => m.ChefsModule),
      },
      {
        path: "reservation",
        loadChildren: () => import("./pages/reservation/reservation.module").then((m) => m.ReservationModule),
      },
      {
        path: "account",
        loadChildren: () => import("./pages/account/account.module").then((m) => m.AccountModule),
      },
      {
        path: "cart",
        loadChildren: () => import("./pages/cart/cart.module").then((m) => m.CartModule),
      },
      {
        path: "checkout",
        loadChildren: () => import("./pages/checkout/checkout.module").then((m) => m.CheckoutModule),
      },
      {
        path: "login",
        loadChildren: () => import("./pages/login/login.module").then((m) => m.LoginModule),
      },
      {
        path: "register",
        loadChildren: () => import("./pages/register/register.module").then((m) => m.RegisterModule),
      },
      {
        path: "faq",
        loadChildren: () => import("./pages/faq/faq.module").then((m) => m.FaqModule),
      },
      {
        path: "terms-conditions",
        loadChildren: () => import("./pages/terms-conditions/terms-conditions.module").then((m) => m.TermsConditionsModule),
      },
    ],
  },
  {
    path: "landing",
    loadChildren: () => import("./pages/landing/landing.module").then((m) => m.LandingModule),
  },
  { path: "admin", loadChildren: () => import("./admin/admin.module").then((m) => m.AdminModule) },
  { path: "adminside", loadChildren: () => import("./admin-meal-plan/admin.module").then((m) => m.AdminModule) },
  { path: "lock-screen", component: LockScreenComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules, // <- comment this line for activate lazy load
      initialNavigation: "enabledBlocking", // for one load page, without reload
      relativeLinkResolution: "legacy",
      // useHash: true
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
