import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; 
import { SharedModule } from 'src/app/shared/shared.module';
import { ChefsComponent } from './chefs.component';
import { ChefComponent } from './chef/chef.component';

export const routes: Routes = [
  { path: '', component: ChefsComponent, pathMatch: 'full' },
  { path: ':id', component: ChefComponent }
];

@NgModule({
  declarations: [
    ChefsComponent, 
    ChefComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ChefsModule { }
