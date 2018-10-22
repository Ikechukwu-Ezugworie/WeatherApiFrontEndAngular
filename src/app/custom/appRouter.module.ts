import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuardService} from '../guards/auth-guard.service';
import {AuthenticationComponent} from '../authenticationRoute/authentication.component';
import {LoginComponent} from '../authenticationRoute/login/login.component';
import {SignUpComponent} from '../authenticationRoute/sign-up/sign-up.component';
import {LoggedInUserComponent} from '../logedInUserRoute/logged-in-user/logged-in-user.component';
import {DashboardComponent} from '../logedInUserRoute/logged-in-user/dashboard/dashboard.component';
import {UsermailerComponent} from '../logedInUserRoute/logged-in-user/usermailer/usermailer.component';
import {CitySettingsComponent} from '../logedInUserRoute/logged-in-user/city-settings/city-settings.component';
import {IsAdminService} from '../guards/isAdminService';


const routes: Routes = [
  {
    path: 'auth', component: AuthenticationComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: SignUpComponent}
    ]
  },
  {path: '', redirectTo: '/weatherpadi', pathMatch: 'full', canActivate: [AuthGuardService]},

  {
    path: 'weatherpadi', component: LoggedInUserComponent, canActivate: [AuthGuardService], children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'citysettings', component: CitySettingsComponent, canActivate: [IsAdminService]},
      {path: 'apimailersettings', component: UsermailerComponent, canActivate: [IsAdminService]}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})


export class AppRouterModule {
}
