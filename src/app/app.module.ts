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
import {FooterComponent} from './layout/components/footer/footer.component';
import {AuthModule} from "./auth/auth.module";
import {check, NgxBootstrapIconsModule, pencil, plus, threeDotsVertical, trash} from "ngx-bootstrap-icons";
import {SharedModule} from "./shared/shared.module";

// Select some icons (use an object, not an array)
const icons = {
  pencil,
  trash,
  check,
  plus,
  threeDotsVertical
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserQuickComponent,

    FooterComponent
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
    SharedModule,

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
