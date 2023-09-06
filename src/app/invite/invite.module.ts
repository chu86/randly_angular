import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InviteLayoutComponent} from './components/invite-layout/invite-layout.component';
import {InviteRoutingModule} from "./invite-routing.module";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {NgxBootstrapIconsModule} from "ngx-bootstrap-icons";
import {SharedModule} from "../shared/shared.module";
import {InviteModalComponent} from './components/invite-modal/invite-modal.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        InviteLayoutComponent,
        InviteModalComponent
    ],
    imports: [
        CommonModule,
        InviteRoutingModule,
        NgbDropdown,
        NgbDropdownItem,
        NgbDropdownMenu,
        NgbDropdownToggle,
        NgxBootstrapIconsModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class InviteModule {
}
