import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListRoutingModule} from "./list-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ListComponent} from "./components/list/list.component";
import {ListItemComponent} from "./components/list-item/list-item.component";
import {ItemComponent} from "./components/item/item.component";
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
    ListComponent,
    ListItemComponent,
    ItemComponent,
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
