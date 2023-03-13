import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; 
import { SharedModule } from '../../shared/shared.module';
import { CategoriesComponent } from './categories/categories.component'; 
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { AddComponent } from './add/add.component';
import { CategoryDialogComponent } from './categories/category-dialog/category-dialog.component';

export const routes: Routes = [ 
  { path: '', redirectTo: 'list', pathMatch: 'full'},
  { path: 'categories', component: CategoriesComponent, data: { breadcrumb: 'Categories' } },
  { path: 'list', component: ListComponent, data: { breadcrumb: 'Menu Items' } },
  { path: 'detail', component: DetailComponent, data: { breadcrumb: 'Menu Item Detail' } },
  { path: 'detail/:id', component: DetailComponent, data: { breadcrumb: 'Menu Item Detail' } }, 
  { path: 'add', component: AddComponent, data: { breadcrumb: 'Add Menu Item' } },
  { path: 'add/:id', component: AddComponent, data: { breadcrumb: 'Edit Menu Item' } }, 
];

@NgModule({
  declarations: [
    CategoriesComponent, 
    ListComponent, 
    DetailComponent, 
    AddComponent, CategoryDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class MenuItemsModule { }
