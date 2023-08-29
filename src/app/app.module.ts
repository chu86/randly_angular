import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from "./auth/services/auth.service";
import {environment} from "./environments/environment";
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from './layout/components/header/header.component';
import {UserQuickComponent} from './auth/components/user-quick/user-quick.component';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {UserListComponent} from './list/components/user-list/user-list.component';
import {FooterComponent} from './layout/components/footer/footer.component';
import {ListLayoutComponent} from './list/components/list-layout/list-layout.component';
import {AuthModule} from "./auth/auth.module";
import {check, NgxBootstrapIconsModule, pencil, plus, trash} from "ngx-bootstrap-icons";

// Select some icons (use an object, not an array)
const icons = {
  pencil,
  trash,
  check,
  plus
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserQuickComponent,
    UserListComponent,
    FooterComponent,
    ListLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    AuthModule,
    NgxBootstrapIconsModule.pick(icons),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
