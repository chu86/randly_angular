import {Component, Input} from '@angular/core';
import {Observable} from "rxjs";
import {BasicList} from "../../models/basic-list.model";
import {BasicListService} from "../../services/basic-list.service";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent {
    public doc$: Observable<BasicList> | undefined;

    @Input()
    get listId(): string | undefined { return this._listId; }
    set listId(value: string | undefined) {
        if (value){
            this.doc$ = this.listService.getCollectionDocument(value);
        }
    }
    private _listId: string | undefined;
    constructor(
        private listService: BasicListService) {
    }
}
