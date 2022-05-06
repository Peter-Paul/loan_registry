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
import { DashSidebarComponent } from './dashboard/dash-sidebar/dash-sidebar.component';
import { DashViewComponent } from './dashboard/dash-content/dash-view/dash-view.component';

import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import { StoreModule } from '@ngrx/store';
import appReducers from './state/app.reducers';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { UsersService } from './services/users/users.service';
import { UsersGuard } from './services/guards/users/users.guard';
import { DashAnalyticsComponent } from './dashboard/dash-content/dash-analytics/dash-analytics.component';
import { RoundProgressComponent } from './dashboard/dash-content/dash-analytics/round-progress/round-progress.component';
import { StackedBarChartComponent } from './dashboard/dash-content/dash-analytics/stacked-bar-chart/stacked-bar-chart.component';
import {  AccumulationAnnotationService, AccumulationChartModule, AccumulationDataLabelService, AccumulationLegendService, AccumulationTooltipService, AreaSeriesService, 
          BarSeriesService, 
          BubbleSeriesService, 
          CategoryService, 
          ChartAllModule, 
          ChartModule, 
          ColumnSeriesService, 
          DataLabelService, 
          LegendService, 
          LineSeriesService, 
          PieSeriesService, 
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
import {  EditService, FilterService,
          GridAllModule,
          GridModule,
          PageService,
          SortService,
          ToolbarService,
            } from "@syncfusion/ej2-angular-grids"
import { PolarChartComponent } from './dashboard/dash-content/dash-analytics/polar-chart/polar-chart.component';
import { TeamAnalyticsComponent } from './dashboard/dash-content/dash-analytics/team-analytics/team-analytics.component';
import { SplineAreaComponent } from './dashboard/dash-content/dash-analytics/spline-area/spline-area.component';
import { DashSearchComponent } from './dashboard/dash-content/dash-search/dash-search.component';
import { DashArchiveComponent } from './dashboard/dash-content/dash-archive/dash-archive.component';
import { ViewClientComponent } from './dashboard/dash-content/dash-view/view-client/view-client.component';
import { ViewWorkerComponent } from './dashboard/dash-content/dash-view/view-worker/view-worker.component';
import { FormClientComponent } from './dashboard/dash-content/dash-form/form-client/form-client.component';
import { DashFormComponent } from './dashboard/dash-content/dash-form/dash-form.component';
import { FormWorkerComponent } from './dashboard/dash-content/dash-form/form-worker/form-worker.component';
import { FormClientStagesComponent } from './dashboard/dash-content/dash-form/form-client-stages/form-client-stages.component';
import { CardRatesComponent } from './dashboard/dash-content/dash-analytics/card-rates/card-rates.component';
import { ColumnChartComponent } from './dashboard/dash-content/dash-analytics/column-chart/column-chart.component';
import { BubbleChartComponent } from './dashboard/dash-content/dash-analytics/bubble-chart/bubble-chart.component';
import { PieChartComponent } from './dashboard/dash-content/dash-analytics/pie-chart/pie-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    WelcomeComponent,
    LoginformsComponent,
    DashContentComponent,
    DashSidebarComponent,
    DashViewComponent,
    AboutComponent,
    ContactComponent,
    DashAnalyticsComponent,
    RoundProgressComponent,
    StackedBarChartComponent,
    PolarChartComponent,
    TeamAnalyticsComponent,
    SplineAreaComponent,
    DashSearchComponent,
    DashArchiveComponent,
    ViewClientComponent,
    ViewWorkerComponent,
    FormClientComponent,
    DashFormComponent,
    FormWorkerComponent,
    FormClientStagesComponent,
    CardRatesComponent,
    ColumnChartComponent,
    BubbleChartComponent,
    PieChartComponent,
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
    GridAllModule,
    AccumulationChartModule
  ],
  providers: [
    UsersService,
    UsersGuard,
    BarSeriesService,
    BubbleSeriesService,
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
    FilterService,
    EditService,
    ToolbarService,
    PieSeriesService,
    AccumulationLegendService,
    AccumulationTooltipService,
    AccumulationDataLabelService,
    AccumulationAnnotationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
