import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BasicList } from "../../../list/models/basic-list.model";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { Breadcrumb } from 'src/app/shared/model/breadcrumb.model';
import { MetaService } from 'src/app/shared/service/meta.service';
import { WINDOW } from 'src/app/shared/token/window.token';
import { ToastService } from 'src/app/shared/service/toast.service';

@Component({
    selector: 'app-item-main',
    templateUrl: './item-main.component.html',
    styleUrls: ['./item-main.component.scss']
})
export class ItemMainComponent implements OnInit, OnDestroy {
    [x: string]: any;

    public formGroup: FormGroup;
    public tagInput = new FormControl('');
    public breadcrumbs: Breadcrumb[] = [];

    private subscription: Subscription | undefined;

    constructor(private fb: FormBuilder, private metaDataService: MetaService, @Inject(WINDOW) private window: Window, private toastService: ToastService) {
        this.formGroup = this.fb.group({
            id: new FormControl('', { updateOn: "blur" }),
            name: new FormControl('', { updateOn: "blur" }),
            description1: new FormControl('', { updateOn: "blur" })
        });
    }

    @Input()
    set document(value: BasicList | null | undefined) {
        this._document = value;
        this.buildBreadcrumbs();
        this.patchForm();
        this.updateMetaData();
    }

    get document() {
        return this._document;
    }

    get getTags() {
        return this.document?.tags?.join(", ");
    }

    private _document: BasicList | null | undefined;

    @Input()
    public isEditing = false;
    @Input()
    public isAdding = false;

    @Input()
    public canEdit = true;
    @Input()
    public canAdd = false;

    @Output() editClicked = new EventEmitter<void>();
    @Output() addClicked = new EventEmitter<void>();
    @Output() confirmClicked = new EventEmitter<void>();
    @Output() editCancel = new EventEmitter<void>();
    @Output() navigateBack = new EventEmitter<void>();
    @Output() valueChanged = new EventEmitter<BasicList>();
    @Output() deleteTagClicked = new EventEmitter<{ doc: BasicList, tagIndex: number }>();
    @Output() addTagClicked = new EventEmitter<{ doc: BasicList, tag: string }>();


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
        this.document.name = value.name;
        this.document.description1 = value.description1;
        this.valueChanged.emit(this.document);
    }

    private patchForm() {
        this.formGroup.patchValue({
            id: this.document?.id ?? null,
            name: this.document?.name ?? '',
            description1: this.document?.description1 ?? ''
        }, { emitEvent: false })
    }

    onEdit() {
        this.editClicked.emit();
    }

    onAdd() {
        this.addClicked.emit();
    }

    onConfirm() {
        this.confirmClicked.emit();
    }

    onCancel() {
        this.editCancel.emit();
    }

    onNavigateBack() {
        this.navigateBack.emit();
    }

    onDeleteTag(index: number) {
        if (!this.document) {
            return;
        }
        this.document.tags.splice(index, 1);
        this.valueChanged.emit(this.document);
    }

    onTagEntered() {
        const tagInputValue = this.tagInput.getRawValue()!;
        if (!this.document || !tagInputValue) {
            return;
        }
        if (!this.document.tags) {
            this.document.tags = [];
        }
        this.document.tags.push(this.tagInput.getRawValue()!);
        this.tagInput.reset();

        this.valueChanged.emit(this.document);
    }

    buildBreadcrumbs() {
        const breadcrumbList: Breadcrumb[] = [{
            name: 'Lischte',
            pathParams: ['list']
        }, 
        {
            name: this.document?.parent?.name!,
            pathParams: ['list', this.document?.parent?.id!]
        }]

        this.breadcrumbs = breadcrumbList;
    }

    updateMetaData() {
        this.metaDataService.updateMetadata({
            title: this._document?.name,
            description: this.document?.description1
        });
    }

    onCopyLink() {
        const url = this.window.location.href;
        this.window.navigator.clipboard.writeText(url).then(() => {
            this.toastService.show('Link kopiert!', 'success', 2000);
        });
    }
}
