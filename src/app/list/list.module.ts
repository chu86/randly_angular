import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListRoutingModule} from "./list-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ListLayoutComponent} from "./components/list-layout/list-layout.component";
import {ListItemComponent} from "./components/list-item/list-item.component";
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
import { ListMainComponent } from './components/list-main/list-main.component';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import { CollectionsLayoutComponent } from './components/collections-layout/collections-layout.component';
import {SharedModule} from "../shared/shared.module";
import {CollectionsComponent} from "./components/collections/collections.component";
import { RandomModalComponent } from './components/random-modal/random-modal.component';

// Select some icons (use an object, not an array)
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
    ListLayoutComponent,
    ListItemComponent,
    ListMainComponent,
    CollectionsLayoutComponent,
    CollectionsComponent,
    RandomModalComponent,
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    ReactiveFormsModule,
    NgxBootstrapIconsModule.pick(icons),
    NgbDropdown,
    NgbDropdownItem,
    NgbDropdownMenu,
    NgbDropdownToggle,
    SharedModule,
  ]
})
export class ListModule {
}
