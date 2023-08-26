import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from "rxjs";
import {BasicListService} from "../../services/basic-list.service";
import {ListItem} from "../../models/list-item.model";
import {BasicList} from "../../models/basic-list.model";

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  public documents$: Observable<ListItem[]> | undefined;

  @Output() itemSelected = new EventEmitter<string>();

  @Input()
  get listId(): string | undefined {
    return this._listId;
  }

  set listId(value: string | undefined) {
    if (value) {
      this.documents$ = this.listService.getListItems(value);
    }
  }

  private _listId: string | undefined;

  constructor(
    private listService: BasicListService) {
  }

  public onItemSelected(id: string) {
    this.itemSelected.emit(id);
  }
}
