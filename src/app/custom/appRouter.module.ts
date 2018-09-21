import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../authentication/login/login.component';
import {AuthenticationComponent} from '../authentication/authentication.component';
import {SignUpComponent} from '../authentication/sign-up/sign-up.component';
import {LoggedInUserComponent} from '../logedInUser/logged-in-user/logged-in-user.component';
import {DashboardComponent} from '../logedInUser/logged-in-user/dashboard/dashboard.component';
import {CitySettingsComponent} from '../logedInUser/logged-in-user/city-settings/city-settings.component';
import {UseLifeCycleInterfaceRule} from 'codelyzer';
import {UsermailerComponent} from '../logedInUser/logged-in-user/usermailer/usermailer.component';


const routes: Routes = [
  {
    path: 'auth', component: AuthenticationComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: SignUpComponent}
    ]
  },
  {path: '', redirectTo: '/weatherpadi', pathMatch: 'full'},

  {
    path: 'weatherpadi', component: LoggedInUserComponent, children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'citysettings', component: CitySettingsComponent},
      {path: 'apimailersettings', component: UsermailerComponent}
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
