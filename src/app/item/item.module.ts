import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {check, NgxBootstrapIconsModule, pencil, plus, trash, x, house, gripVertical, link45Deg, clipboard} from "ngx-bootstrap-icons";
import {ReactiveFormsModule} from "@angular/forms";
import {ItemRoutingModule} from "./item-routing.module";
import {ItemLayoutComponent} from './components/item-layout/item-layout.component';
import {ItemMainComponent} from './components/item-main/item-main.component';
import {ItemListComponent} from './components/item-list/item-list.component';
import { SharedModule } from '../shared/shared.module';
import { ItemAddComponent } from './components/item-add/item-add.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ItemDirectionsComponent } from './components/item-directions/item-directions.component';
import { ItemCopyModalComponent } from './components/item-copy-modal/item-copy-modal.component';

// Select some icons (use an object, not an array)
const icons = {
    pencil,
    trash,
    check,
    plus,
    x,
    house,
    gripVertical,
    link45Deg,
    clipboard
};

@NgModule({
    declarations: [
        ItemLayoutComponent,
        ItemMainComponent,
        ItemDirectionsComponent,
        ItemListComponent,
        ItemAddComponent,
        ItemCopyModalComponent,
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
