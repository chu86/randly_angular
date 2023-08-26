import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "./components/login/login.component";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {AngularSvgIconModule} from "angular-svg-icon";
import {AngularSvgIconPreloaderModule} from "angular-svg-icon-preloader";

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AngularSvgIconModule.forRoot(), // angular-svg-icon library module
    AngularSvgIconPreloaderModule.forRoot({
      configUrl: './assets/icons.json',
    }),
    provideAuth(() => getAuth()),
  ],
  exports: [LoginComponent]
})
export class AuthModule {
}
