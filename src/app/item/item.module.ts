import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {check, NgxBootstrapIconsModule, pencil, plus, trash, x, house, gripVertical} from "ngx-bootstrap-icons";
import {ReactiveFormsModule} from "@angular/forms";
import {ItemRoutingModule} from "./item-routing.module";
import {ItemLayoutComponent} from './components/item-layout/item-layout.component';
import {ItemMainComponent} from './components/item-main/item-main.component';
import {ItemListComponent} from './components/item-list/item-list.component';
import { SharedModule } from '../shared/shared.module';
import { ItemAddComponent } from './components/item-add/item-add.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

// Select some icons (use an object, not an array)
const icons = {
    pencil,
    trash,
    check,
    plus,
    x,
    house,
    gripVertical
};

@NgModule({
    declarations: [
        ItemLayoutComponent,
        ItemMainComponent,
        ItemListComponent,
        ItemAddComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ItemRoutingModule,
        SharedModule,
        DragDropModule,
        NgxBootstrapIconsModule.pick(icons),
    ]
})
export class ItemModule {
}
