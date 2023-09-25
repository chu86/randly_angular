import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {
  check,
  NgxBootstrapIconsModule,
  pencil,
  plus,
  search,
  threeDotsVertical,
  trash,
  x,
  share,
  dice6
} from "ngx-bootstrap-icons";

const icons = {
  pencil,
  trash,
  check,
  plus,
  x,
  search,
  threeDotsVertical,
  share,
  dice6
};

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NgxBootstrapIconsModule.pick(icons),
  ]
})
export class ProfileModule { }
