import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component'
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { 
  AuthGuardService as AuthGuard 
} from './services/auth-guard.service'
import { 
  LoggedInGuardService as LoggedInGuard 
} from './services/logged-in-guard.service'
const routes: Routes = [
  {path: '', redirectTo: '/vehicle', pathMatch: 'full' },
  {path:'login',component:LoginComponent,canActivate:[LoggedInGuard]},
  {path:'vehicle',component:VehicleComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
