import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginContainer} from "./components/login-container/login-container.component";
import {LoginComponent} from "./components/login/login.component";
import {AngularSvgIconModule} from "angular-svg-icon";
import {AngularSvgIconPreloaderModule} from "angular-svg-icon-preloader";
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    LoginContainer
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AngularSvgIconModule.forRoot(), // angular-svg-icon library module
    AngularSvgIconPreloaderModule.forRoot({
      configUrl: './assets/icons.json',
    }),
  ],
  exports: [LoginComponent, LoginContainer]
})
export class AuthenticationModule {
}
