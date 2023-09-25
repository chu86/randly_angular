import { Component, EventEmitter, Input, OnDestroy, Output, QueryList, ViewChildren } from '@angular/core';
import { Subscription } from "rxjs";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ListItemForm } from "../../models/list-item-form.model";
import { BasicList } from '../../models/basic-list.model';
import { BasicListService } from '../../services/basic-list.service';

@Component({
  selector: 'app-list-item-edit',
  templateUrl: './list-item-edit.component.html',
  styleUrls: ['./list-item-edit.component.scss']
})
export class ListItemEditComponent implements OnDestroy {

  @Output() addNewActivated = new EventEmitter<BasicList>();
  @Output() deleteActivated = new EventEmitter<BasicList>();
  @Output() editItemActivated = new EventEmitter<BasicList[]>();

  @Input()
  get filter(): string | null | undefined {
    return this._filter;
  }

  set filter(value: string | null | undefined) {
    this._filter = value;
    this.filteredListItems = this.listService.filterSortListItems(this.listitems, this.filter);
    if (this.filteredListItems) {
      this.initFormGroup(this.filteredListItems);
    }
  }

  private _filter: string | null | undefined;

  @Input()
  get listitems(): BasicList[] | null | undefined {
    return this._listitems;
  }

  set listitems(value: BasicList[] | null | undefined) {
    this._listitems = value;
    this.filteredListItems = this.listService.filterSortListItems(value, this.filter);
    if (this.filteredListItems) {
      this.initFormGroup(this.filteredListItems);
      this.changes = [];
    }
  }

  private _listitems: BasicList[] | null | undefined;
  public filteredListItems: BasicList[] = [];

  @ViewChildren('input') test: QueryList<Element> | undefined

  private formSubscriptions: Subscription[] = [];
  public form = new FormGroup<ListItemForm>({
    listitems: new FormArray<FormControl<BasicList>>([])
  })

  private changes: BasicList[] = [];

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

  addListItem(name: string, order: number, id: string | undefined): FormGroup {
    const listItemForm = this.fb.group({
      name: new FormControl(name, Validators.required),
      order: new FormControl(order, Validators.required),
      id: new FormControl(id)
    }, { updateOn: 'blur' });
    const subscription = listItemForm.valueChanges.subscribe(item => {
      if (item) {
        this.onItemChanged(item as BasicList);
      }
    })
    this.formSubscriptions.push(subscription);
    return listItemForm;
  }

  onItemChanged(item: BasicList): void {
    const sameItem = this.changes.find(c => c.id === item.id);
    if (sameItem) { 
      const itemIndex = this.changes.indexOf(sameItem);
      this.changes[itemIndex] = item;
    }
    else {
      this.changes.push(item);
    }
    this.editItemActivated.emit(this.changes);

  }

  get listitemControls() {
    return this.form.controls["listitems"] as FormArray;
  }

  set listitemControls(value: FormArray) {
    this.form.controls["listitems"] = value;
  }

  deleteItem(index: number) {
    if (this.filteredListItems) {
      this.deleteActivated.emit(this.filteredListItems[index])
    }
  }

  ngOnDestroy(): void {
    this.formSubscriptions.forEach(sub => sub.unsubscribe())
  }
}
