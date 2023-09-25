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

  @Input()
  get filter(): string | null | undefined {
    return this._filter;
  }

  set filter(value: string | null | undefined) {
    this._filter = value;
    this.filteredListItems = this.listService.filterSortListItems(this.listitems, this.filter);
  }

  private _filter: string | null | undefined;

  @Input()
  get listitems(): BasicList[] | null | undefined {
    return this._listitems;
  }

  set listitems(value: BasicList[] | null | undefined) {
    this._listitems = value;
    this.filteredListItems = this.listService.filterSortListItems(value, this.filter);
  }

  private _listitems: BasicList[] | null | undefined;
  public filteredListItems: BasicList[] = [];

  private formSubscriptions: Subscription[] = [];
  public form = new FormGroup<ListItemForm>({
    listitems: new FormArray<FormControl<BasicList>>([])
  })

  constructor(
    private listService: BasicListService) {
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

  ngOnDestroy(): void {
    this.formSubscriptions.forEach(sub => sub.unsubscribe())
  }
}
