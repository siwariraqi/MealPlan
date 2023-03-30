import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; 
import { SharedModule } from '../../shared/shared.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { AddComponent } from './add/add.component';


export const routes: Routes = [ 
  { path: '', redirectTo: 'list', pathMatch: 'full'},
  { path: 'list', component: ListComponent, data: { breadcrumb: 'Meal Items' } },
  { path: 'detail', component: DetailComponent, data: { breadcrumb: 'Meal Item Detail' } },
  { path: 'detail/:id', component: DetailComponent, data: { breadcrumb: 'Meal Item Detail' } }, 
  { path: 'add', component: AddComponent, data: { breadcrumb: 'Add Meal Item' } },
  { path: 'add/:id', component: AddComponent, data: { breadcrumb: 'Edit Meal Item' } }, 
];

@NgModule({
  declarations: [
    ListComponent, 
    DetailComponent, 
    AddComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class MenuItemsModule { }
