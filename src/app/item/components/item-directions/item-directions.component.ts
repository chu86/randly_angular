import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BasicList } from "../../../list/models/basic-list.model";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-item-directions',
    templateUrl: './item-directions.component.html',
    styleUrls: ['./item-directions.component.scss']
})
export class ItemDirectionsComponent implements OnInit, OnDestroy {
    [x: string]: any;

    public formGroup: FormGroup;
    private subscription: Subscription | undefined;

    constructor(private fb: FormBuilder) {
        this.formGroup = this.fb.group({
            id: new FormControl('', { updateOn: "blur" }),
            description1: new FormControl('', { updateOn: "blur" })
        });
    }

    @Input()
    set document(value: BasicList | null | undefined) {
        this._document = value;
        this.patchForm();
    }

    get document() {
        return this._document;
    }

    get description() {
        return this._document?.description1;
    }

    private _document: BasicList | null | undefined;

    @Input()
    public isEditing = false;

    @Output() valueChanged = new EventEmitter<BasicList>();

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    ngOnInit(): void {
        this.subscription = this.formGroup.valueChanges.subscribe(value => this.onValueChanged(value));
    }

    private onValueChanged(value: BasicList) {
        if (!this.document) {
            return;
        }
        this.document.description1 = value.description1;
        this.valueChanged.emit(this.document);
    }

    private patchForm() {
        this.formGroup.patchValue({
            id: this.document?.id ?? null,
            description1: this.document?.description1 ?? ''
        }, { emitEvent: false })
    }

    onDeleteTag(index: number) {
        if (!this.document) {
            return;
        }
        this.document.tags.splice(index, 1);
        this.valueChanged.emit(this.document);
    }
}
