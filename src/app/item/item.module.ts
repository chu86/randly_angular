import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {check, NgxBootstrapIconsModule, pencil, plus, trash, x} from "ngx-bootstrap-icons";
import {ReactiveFormsModule} from "@angular/forms";
import {ItemRoutingModule} from "./item-routing.module";
import {ItemLayoutComponent} from './components/item-layout/item-layout.component';
import {ItemMainComponent} from './components/item-main/item-main.component';
import {ItemListComponent} from './components/item-list/item-list.component';

// Select some icons (use an object, not an array)
const icons = {
    pencil,
    trash,
    check,
    plus,
    x
};

@NgModule({
    declarations: [
        ItemLayoutComponent,
        ItemMainComponent,
        ItemListComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ItemRoutingModule,
        NgxBootstrapIconsModule.pick(icons),
    ]
})
export class ItemModule {
}
