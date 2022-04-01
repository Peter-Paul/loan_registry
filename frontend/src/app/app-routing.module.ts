import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthComponent } from './auth/auth.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersGuard } from './services/guards/users/users.guard';

const routes: Routes = [
  {path:"",component:AuthComponent},
  {path:"dashboard",component:DashboardComponent,canActivate:[UsersGuard]},
  {path:"about",component:AboutComponent},
  {path:"contact",component:ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
