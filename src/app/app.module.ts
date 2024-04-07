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
import {AuthenticationModule} from "./auth/authentication.module";
import {check, NgxBootstrapIconsModule, pencil, plus, threeDotsVertical, trash, personCircle} from "ngx-bootstrap-icons";
import {SharedModule} from "./shared/shared.module";
import { DragDropModule } from '@angular/cdk/drag-drop';

const icons = {
  pencil,
  trash,
  check,
  plus,
  threeDotsVertical,
  personCircle
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
    AuthenticationModule,
    SharedModule,
    DragDropModule,
    NgxBootstrapIconsModule.pick(icons),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),


  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
