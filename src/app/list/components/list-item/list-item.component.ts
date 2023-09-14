import {Component, EventEmitter, Input, OnDestroy, Output, QueryList, ViewChildren} from '@angular/core';
import {Subscription} from "rxjs";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ListItemForm} from "../../models/list-item-form.model";
import { BasicList } from '../../models/basic-list.model';
import { BasicListService } from '../../services/basic-list.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnDestroy {

  @Output() itemSelected = new EventEmitter<string>();
  @Output() addNewActivated = new EventEmitter<BasicList>();
  @Output() deleteActivated = new EventEmitter<BasicList>();
  @Output() editItemActivated = new EventEmitter<BasicList>();

  @Input()
  get filter(): string | null | undefined {
    return this._filter;
  }

  set filter(value: string | null | undefined) {
    this._filter = value;
    this.filteredListItems = this.filterSortListItems(this.listitems);
    if (this.filteredListItems) {
      this.initFormGroup(this.filteredListItems);
    }
  }

  private _filter: string | null | undefined;

  @Input()
  public set isEditing(value) {
    this._isEditing = value;
    if (this.isEditing && this.filteredListItems) {
      this.initFormGroup(this.filteredListItems);
    }
  }

  private _isEditing = false;
  public get isEditing() {
    return this._isEditing;
  }

  @Input()
  get listitems(): BasicList[] | null | undefined {
    return this._listitems;
  }

  set listitems(value: BasicList[] | null | undefined) {
    this._listitems = value;
    this.filteredListItems = this.filterSortListItems(value);
    if (this.filteredListItems) {
      this.initFormGroup(this.filteredListItems);
    }
  }

  private _listitems: BasicList[] | null | undefined;
  public filteredListItems: BasicList[] = [];

  @ViewChildren('input') test: QueryList<Element> | undefined

  private formSubscriptions: Subscription[] = [];
  public form = new FormGroup<ListItemForm>({
    listitems: new FormArray<FormControl<BasicList>>([])
  })

  constructor(
    private fb: FormBuilder,
    private listService: BasicListService) {
  }

  private initFormGroup(items: BasicList[]) {
    const formGroups: FormGroup[] = [];
    for (const val of items) {
        formGroups.push(this.addListItem(val.name, val.order, val.id));
    }
    this.listitemControls = new FormArray(formGroups);
  }

  private filterSortListItems(value: BasicList[] | null | undefined): BasicList[] {
    if (!value){
      return [];
    }
    let filteredValue = value;
    if (this.filter){
      filteredValue = value.filter(item=> item.name.toLowerCase().includes(this.filter!.toLocaleLowerCase()))
    }
    return filteredValue?.sort(({order:a}, {order:b}) => a-b);
  }

  addListItem(name: string, order: number, id: string | undefined): FormGroup {
    const listItemForm = this.fb.group({
      name: new FormControl(name, Validators.required),
      order: new FormControl(order, Validators.required),
      id: new FormControl(id)
    }, {updateOn: 'blur'});
    const subscription = listItemForm.valueChanges.subscribe(item => {
      if (item) {
        this.onItemChanged(item as BasicList);
      }
    })
    this.formSubscriptions.push(subscription);
    return listItemForm;
  }

  onItemChanged(item: BasicList): void {
    this.editItemActivated.emit(item);
  }

  get listitemControls() {
    return this.form.controls["listitems"] as FormArray;
  }

  set listitemControls(value: FormArray) {
    this.form.controls["listitems"] = value;
  }

  public onItemSelected(id: string | undefined) {
    if (id) {
      this.itemSelected.emit(id);
    }
  }

  deleteItem(index: number) {
    if (this.filteredListItems) {
      this.deleteActivated.emit(this.filteredListItems[index])
    }
  }

  addNew() {
    const newItem: BasicList = {
      name: '',
      order: this.listService.getMaxOrder(this.listitems) + 1,
      description1: '',
      created: new Date()
    }
    this.addNewActivated.emit(newItem);
  }


  ngOnDestroy(): void {
    this.formSubscriptions.forEach(sub => sub.unsubscribe())
  }
}
