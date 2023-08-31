import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BasicList} from "../../models/basic-list.model";
import {Location} from "@angular/common";

@Component({
    selector: 'app-list-main',
    templateUrl: './list-main.component.html',
    styleUrls: ['./list-main.component.scss']
})
export class ListMainComponent {

    @Input()
    public document: BasicList | null | undefined;

    @Input()
    public isEditing = false;

    @Output() editClicked = new EventEmitter<void>();
    @Output() editCancel = new EventEmitter<void>();
    @Output() navigateBack = new EventEmitter<void>();
    @Output() shareClicked = new EventEmitter<void>();

    constructor(
        private location: Location) {
    }

    onEditClicked() {
        this.editClicked.emit();
    }

    onEditCancel() {
        this.editCancel.emit();
    }

    onNavigateBackClicked() {
        this.location.back();
    }

    onShareClicked() {
        this.shareClicked.emit();
    }
}
