import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { MenuComponent } from './menu.component';
import { MenuSingleComponent } from './menu-single/menu-single.component';

export const routes: Routes = [
  { path: '', component: MenuComponent, pathMatch: 'full' },
  { path: ':id', component: MenuSingleComponent }
];

@NgModule({
  declarations: [
    MenuComponent, 
    MenuSingleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    PipesModule
  ]
})
export class MenuModule { }
