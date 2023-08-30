import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListRoutingModule} from "./list-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ListComponent} from "./components/list/list.component";
import {ListItemComponent} from "./components/list-item/list-item.component";
import {check, NgxBootstrapIconsModule, pencil, plus, search, threeDotsVertical, trash, x} from "ngx-bootstrap-icons";
import { ListMainComponent } from './components/list-main/list-main.component';

// Select some icons (use an object, not an array)
const icons = {
  pencil,
  trash,
  check,
  plus,
  x,
  search,
  threeDotsVertical
};

@NgModule({
  declarations: [
    ListComponent,
    ListItemComponent,
    ListMainComponent,

  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    ReactiveFormsModule,
    NgxBootstrapIconsModule.pick(icons),
  ]
})
export class ListModule {
}
