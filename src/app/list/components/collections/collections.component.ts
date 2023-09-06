import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BasicListService} from "../../services/basic-list.service";
import {BasicList} from "../../models/basic-list.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent {

  @Input()
  public isEditing = false;

  @Input()
  get filter(): string | null | undefined {
    return this._filter;
  }

  set filter(value: string | null | undefined) {
    this._filter = value;
  }

  private _filter: string | null | undefined;

  @Output()
  public deleteActivated: EventEmitter<BasicList> = new EventEmitter<BasicList>();

  @Input()
  get listitems(): BasicList[] | null | undefined {
    return this._listitems;
  }

  set listitems(value: BasicList[] | null | undefined) {
    this._listitems = value;
  }

  private _listitems: BasicList[] | null | undefined;

  public filtereditems: BasicList[] = [];

  @Output() listSelected = new EventEmitter<string>();

  constructor(
    public listService: BasicListService, public router: Router) {
  }

  public itemSelected(id: string | undefined | null) {
    if (id) {
      this.listSelected.emit(id);
    }
  }

  deleteItem(i: number) {
    if (!this.listitems) {
      return;
    }
    this.deleteActivated.emit(this.listitems[i])
  }
}
