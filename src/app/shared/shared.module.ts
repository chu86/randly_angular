import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputFilterComponent} from './components/input-filter/input-filter.component';
import {check, NgxBootstrapIconsModule, pencil, plus, search, threeDotsVertical, trash, x} from "ngx-bootstrap-icons";
import {ReactiveFormsModule} from "@angular/forms";

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
        InputFilterComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgxBootstrapIconsModule.pick(icons),
    ],
    exports: [InputFilterComponent]
})
export class SharedModule {
}
