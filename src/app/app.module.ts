import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CustomMaterialsDesignModule} from './custom/custom-materials-design.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './authenticationRoute/login/login.component';
import {AuthenticationComponent} from './authenticationRoute/authentication.component';
import {SignUpComponent} from './authenticationRoute/sign-up/sign-up.component';
import {LoggedInUserComponent} from './logedInUserRoute/logged-in-user/logged-in-user.component';
import {DashboardComponent} from './logedInUserRoute/logged-in-user/dashboard/dashboard.component';
import {CitySettingsComponent} from './logedInUserRoute/logged-in-user/city-settings/city-settings.component';
import {UsermailerComponent} from './logedInUserRoute/logged-in-user/usermailer/usermailer.component';
import {AppRouterModule} from './custom/appRouter.module';
import {AuthenticationService} from './service/authentication.service';
import {AuthGuardService} from './guards/auth-guard.service';
import {CityService} from './service/city.service';
import {SimpleUserService} from './service/simple-user.service';
import {CreateUserComponent} from './logedInUserRoute/logged-in-user/create-user/create-user.component';
import {IsAdminService} from './guards/isAdminService';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthenticationComponent,
    SignUpComponent,
    LoggedInUserComponent,
    DashboardComponent,
    CitySettingsComponent,
    UsermailerComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CustomMaterialsDesignModule,
    AppRouterModule
  ],
  providers: [AuthenticationService, AuthGuardService, CityService, SimpleUserService, IsAdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
