import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BasicListService} from "../../services/basic-list.service";
import {Observable} from "rxjs";
import {BasicList} from "../../models/basic-list.model";
import {Router} from "@angular/router";
import {ItemListItem} from "../../../item/models/item-list-item.model";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  @Input()
  get filter(): string | null | undefined {
    return this._filter;
  }

  set filter(value: string | null | undefined) {
    this._filter = value;
    if (this.listitems) {
      // if (!value) {
      //
      // }
      // this.filtereditems = this.listitems.filter(item=>item.name.startsWith(value))
    }
  }

  private _filter: string | null | undefined;

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
      public listService: BasicListService, public router: Router){}

    public itemSelected(id: string) {
      this.listSelected.emit(id);
    }
}
