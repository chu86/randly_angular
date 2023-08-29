import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BasicList} from "../../../list/models/basic-list.model";

@Component({
    selector: 'app-item-main',
    templateUrl: './item-main.component.html',
    styleUrls: ['./item-main.component.scss']
})
export class ItemMainComponent {

    @Input()
    public document: BasicList | null | undefined;

    @Input()
    public isEditing = false;

    @Output() editClicked = new EventEmitter<void>();
    @Output() editCancel = new EventEmitter<void>();
    @Output() navigateBack = new EventEmitter<void>();

    onEditClicked() {
        this.editClicked.emit();
    }

    onEditCancel() {
        this.editCancel.emit();
    }

    onNavigateBackClicked() {
        this.navigateBack.emit();
    }
}
