import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from "./auth/services/auth.service";
import {environment} from "./environments/environment";
import {LoginComponent} from './auth/components/login/login.component';
import {AngularSvgIconPreloaderModule} from "angular-svg-icon-preloader";
import {AngularSvgIconModule} from "angular-svg-icon";
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from './layout/header/header.component';
import {UserQuickComponent} from './auth/components/user-quick/user-quick.component';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { UserListComponent } from './list/components/user-list/user-list.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HeaderComponent,
        UserQuickComponent,
        UserListComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        HttpClientModule,
        AngularSvgIconModule.forRoot(), // angular-svg-icon library module
        AngularSvgIconPreloaderModule.forRoot({
            configUrl: './assets/icons.json',
        }),
        // AngularFireModule.initializeApp(environment.firebase),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
