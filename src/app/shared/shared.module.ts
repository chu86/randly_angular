import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFilterComponent } from './components/input-filter/input-filter.component';
import { check, NgxBootstrapIconsModule, pencil, plus, search, threeDotsVertical, trash, x, chevronLeft } from "ngx-bootstrap-icons";
import { ReactiveFormsModule } from "@angular/forms";
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { ButtonEditComponent } from './components/button-edit/button-edit.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { LinkifyPipe } from './pipes/linkify.pipe';

const icons = {
    pencil,
    trash,
    check,
    plus,
    x,
    search,
    threeDotsVertical,
    chevronLeft
};

@NgModule({
    declarations: [
        InputFilterComponent,
        ConfirmModalComponent,
        ButtonEditComponent,
        BreadcrumbComponent,
        LinkifyPipe
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgxBootstrapIconsModule.pick(icons),
    ],
    exports: [InputFilterComponent, ButtonEditComponent, BreadcrumbComponent, LinkifyPipe]
})
export class SharedModule {
}
