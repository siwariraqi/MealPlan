import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; 
import { SharedModule } from '../../shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AnalyticsComponent } from './analytics.component';
import { MontlySalesComponent } from './montly-sales/montly-sales.component';
import { SalesSummaryComponent } from './sales-summary/sales-summary.component';
import { DailyViewsStatsComponent } from './daily-views-stats/daily-views-stats.component';
import { MostViewedProductsComponent } from './most-viewed-products/most-viewed-products.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { RefundsComponent } from './refunds/refunds.component';

export const routes: Routes = [
  { path: '', component: AnalyticsComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AnalyticsComponent,
    MontlySalesComponent,
    SalesSummaryComponent,
    DailyViewsStatsComponent,
    MostViewedProductsComponent,
    TransactionsComponent,
    RefundsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), 
    SharedModule,
    NgxChartsModule
  ]
})
export class AnalyticsModule { }
