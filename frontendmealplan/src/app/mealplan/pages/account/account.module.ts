import { NgModule ,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { AccountComponent } from './account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { HelpSupportComponent } from './help-support/help-support.component';
import { AboutComponent } from './about/about.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';


export const routes: Routes = [
  { 
    path: '', 
    component: AccountComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'password-change', component: PasswordChangeComponent },
      { path: 'account-settings', component: AccountSettingsComponent },
      { path: 'about', component: AboutComponent },
      { path: 'help-support', component: HelpSupportComponent },
      { path: 'privacy', component: PrivacyComponent },
      { path: 'terms', component: TermsComponent }
    ]
  }
];


@NgModule({
  declarations: [
    AccountComponent,
    DashboardComponent,
    ProfileComponent,
    PasswordChangeComponent,
    AccountSettingsComponent,
    HelpSupportComponent,
    AboutComponent,
    PrivacyComponent,
    TermsComponent 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountModule { }
