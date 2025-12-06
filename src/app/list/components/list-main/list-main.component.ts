import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BasicList } from "../../models/basic-list.model";
import { Location } from "@angular/common";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { Breadcrumb } from 'src/app/shared/model/breadcrumb.model';
import { MetaService } from 'src/app/shared/service/meta.service';

@Component({
  selector: 'app-list-main',
  templateUrl: './list-main.component.html',
  styleUrls: ['./list-main.component.scss']
})
export class ListMainComponent implements OnInit, OnDestroy {

  public formGroup: FormGroup;
  public breadcrumbs: Breadcrumb[] = [];

  @Input()
  set document(value: BasicList | null | undefined) {
    this._document = value;
    this.patchForm();
    this.buildBreadcrumbs();
    this.updateMetaData();
  }

  get document() {
    return this._document;
  }

  private _document: BasicList | null | undefined;
  private subscription: Subscription | undefined;


  @Input()
  public isEditing = false;

  @Output() editClicked = new EventEmitter<void>();
  @Output() confirmClicked = new EventEmitter<void>();
  @Output() editCancel = new EventEmitter<void>();
  @Output() navigateBack = new EventEmitter<void>();
  @Output() shareClicked = new EventEmitter<void>();
  @Output() valueChanged = new EventEmitter<BasicList>();
  @Output() fullRandomClicked = new EventEmitter<void>();
  @Output() addClicked = new EventEmitter<void>();

  constructor(
    private location: Location, private fb: FormBuilder,
    private metaDataService: MetaService) {
    this.formGroup = this.fb.group({
      id: new FormControl('', { updateOn: "blur" }),
      name: new FormControl('', { updateOn: "blur" }),
      description1: new FormControl('', { updateOn: "blur" })
    });
  }

  onEdit() {
    this.editClicked.emit();
  }

  onCancel() {
    this.editCancel.emit();
  }

  onConfirm() {
    this.confirmClicked.emit();
  }

  onNavigateBack() {
    this.location.back();
  }

  onShare() {
    this.shareClicked.emit();
  }

  onAddClicked() {
    this.addClicked.emit();
  }

  private patchForm() {
    this.formGroup.patchValue({
      id: this.document?.id ?? null,
      name: this.document?.name ?? '',
      description1: this.document?.description1 ?? ''
    }, { emitEvent: false })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.formGroup.valueChanges.subscribe(value => this.onValueChanged(value));
  }

  get getNameFormControl() {
    return this.formGroup.controls["name"];
  }

  get getDescriptionFormControl() {
    return this.formGroup.controls["description1"];
  }

  private onValueChanged(value: BasicList) {
    this.valueChanged.emit(value);
  }

  onRandomClicked() {
    this.fullRandomClicked.emit();
  }
  
  updateMetaData() {
    this.metaDataService.updateMetadata({
        title: this._document?.name,
        description: this.document?.description1
    });
  }

  buildBreadcrumbs() {
    const breadcrumbList: Breadcrumb = {
        name: 'Lischte',
        pathParams: ['list']
    }
    this.breadcrumbs = [breadcrumbList];
  }
}
