import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from './shared/shared.module';
import { WelcomeComponent } from './auth/welcome/welcome.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginformsComponent } from './auth/loginforms/loginforms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashContentComponent } from './dashboard/dash-content/dash-content.component';
import { DashAddComponent } from './dashboard/dash-content/dash-add/dash-add.component';
import { DashUpdateComponent } from './dashboard/dash-content/dash-update/dash-update.component';
import { DashSidebarComponent } from './dashboard/dash-sidebar/dash-sidebar.component';
import { DashViewComponent } from './dashboard/dash-content/dash-view/dash-view.component';
import { DashAdminAddComponent } from './dashboard/dash-content/dash-admin-add/dash-admin-add.component';

import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import { DashProfileComponent } from './dashboard/dash-content/dash-profile/dash-profile.component';
import { DashTableComponent } from './dashboard/dash-content/dash-table/dash-table.component';
import { StoreModule } from '@ngrx/store';
import appReducers from './state/app.reducers';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { UsersService } from './services/users/users.service';
import { UsersGuard } from './services/guards/users/users.guard';
import { DashCustomersComponent } from './dashboard/dash-content/dash-customers/dash-customers.component';
import { DashAnalyticsComponent } from './dashboard/dash-content/dash-analytics/dash-analytics.component';
import { RoundProgressComponent } from './dashboard/dash-content/dash-analytics/round-progress/round-progress.component';
import { StackedBarChartComponent } from './dashboard/dash-content/dash-analytics/stacked-bar-chart/stacked-bar-chart.component';
import {  AreaSeriesService, 
          BarSeriesService, 
          CategoryService, 
          ChartAllModule, 
          ChartModule, 
          ColumnSeriesService, 
          DataLabelService, 
          LegendService, 
          LineSeriesService, 
          PolarSeriesService, 
          RadarSeriesService, 
          RangeColumnSeriesService, 
          ScatterSeriesService, 
          SplineSeriesService, 
          StackingAreaSeriesService, 
          StackingBarSeriesService, 
          StackingColumnSeriesService,
          } from '@syncfusion/ej2-angular-charts';
// import {} from
import {  FilterService,
          GridAllModule,
          GridModule,
          PageService,
          SortService,
            } from "@syncfusion/ej2-angular-grids"
import { PolarChartComponent } from './dashboard/dash-content/dash-analytics/polar-chart/polar-chart.component';
import { TeamAnalyticsComponent } from './dashboard/dash-content/dash-analytics/team-analytics/team-analytics.component';
import { SplineAreaComponent } from './dashboard/dash-content/dash-analytics/spline-area/spline-area.component';
import { DashPurchaseComponent } from './dashboard/dash-content/dash-purchase/dash-purchase.component';
import { DashSearchComponent } from './dashboard/dash-content/dash-search/dash-search.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    WelcomeComponent,
    LoginformsComponent,
    DashContentComponent,
    DashAddComponent,
    DashUpdateComponent,
    DashSidebarComponent,
    DashViewComponent,
    DashAdminAddComponent,
    DashProfileComponent,
    DashTableComponent,
    AboutComponent,
    ContactComponent,
    DashCustomersComponent,
    DashAnalyticsComponent,
    RoundProgressComponent,
    StackedBarChartComponent,
    PolarChartComponent,
    TeamAnalyticsComponent,
    SplineAreaComponent,
    DashPurchaseComponent,
    DashSearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    NgbModule,
    StoreModule.forRoot({state:appReducers}),
    ChartModule,
    ChartAllModule,
    GridModule,
    GridAllModule
  ],
  providers: [
    UsersService,
    UsersGuard,
    BarSeriesService,
    StackingBarSeriesService,
    CategoryService,
    DataLabelService,
    LegendService,
    AreaSeriesService,
    LineSeriesService,
    ColumnSeriesService,
    StackingColumnSeriesService,
    StackingAreaSeriesService,
    RangeColumnSeriesService,
    ScatterSeriesService,
    PolarSeriesService,
    RadarSeriesService,
    SplineSeriesService,
    PageService,
    SortService,
    FilterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
