import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BasicList} from "../../../list/models/basic-list.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-item-main',
    templateUrl: './item-main.component.html',
    styleUrls: ['./item-main.component.scss']
})
export class ItemMainComponent implements OnInit, OnDestroy{

    public formGroup: FormGroup;

    private subscription: Subscription | undefined;

    constructor(private fb: FormBuilder) {
        this.formGroup = this.fb.group({
            id: new FormControl('', {updateOn: "blur"}),
            name: new FormControl('', {updateOn: "blur"}),
            description1: new FormControl('', {updateOn: "blur"})
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

    private _document: BasicList | null | undefined;

    @Input()
    public isEditing = false;

    @Output() editClicked = new EventEmitter<void>();
    @Output() editCancel = new EventEmitter<void>();
    @Output() navigateBack = new EventEmitter<void>();
    @Output() valueChanged = new EventEmitter<BasicList>();


    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    ngOnInit(): void {
        this.subscription = this.formGroup.valueChanges.subscribe(value => this.onValueChanged(value));
    }

    private onValueChanged(value: BasicList) {
        this.valueChanged.emit(value);
    }

    private patchForm() {
        this.formGroup.patchValue({
            id: this.document?.id ?? null,
            name: this.document?.name ?? '',
            description1: this.document?.description1 ?? ''
        }, { emitEvent: false})
    }

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