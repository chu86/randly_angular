import {Component, Input} from '@angular/core';
import {Observable} from "rxjs";
import {BasicListService} from "../../services/basic-list.service";
import {ListItem} from "../../models/list-item.model";

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
    public documents$: Observable<ListItem[]> | undefined;

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
}
