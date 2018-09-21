import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CustomMaterialsDesignModule} from './custom/custom-materials-design.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './authentication/login/login.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import {AppRouterModule} from './custom/appRouter.module';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { LoggedInUserComponent } from './logedInUser/logged-in-user/logged-in-user.component';
import { DashboardComponent } from './logedInUser/logged-in-user/dashboard/dashboard.component';
import { CitySettingsComponent } from './logedInUser/logged-in-user/city-settings/city-settings.component';
import { UsermailerComponent } from './logedInUser/logged-in-user/usermailer/usermailer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthenticationComponent,
    SignUpComponent,
    LoggedInUserComponent,
    DashboardComponent,
    CitySettingsComponent,
    UsermailerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CustomMaterialsDesignModule,
    AppRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
