import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {BasicList} from "../../../list/models/basic-list.model";
import {ItemListItem} from "../../models/item-list-item.model";
import {BasicListService} from "../../../list/services/basic-list.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Location} from '@angular/common';

@Component({
    selector: 'app-item-layout',
    templateUrl: './item-layout.component.html',
    styleUrls: ['./item-layout.component.scss']
})
export class ItemLayoutComponent implements OnInit, OnDestroy {
    public doc$: Observable<BasicList> | undefined;
    public listitems$: Observable<ItemListItem[]> | undefined;
    public listId: string | null | undefined;
    public docId: string | null | undefined;
    public isEditing = false;

    public paramMapSubscription: Subscription | undefined;

    constructor(
        private listService: BasicListService,
        private route: ActivatedRoute,
        private location: Location) {
    }

    public ngOnInit(): void {
        this.paramMapSubscription = this.route.paramMap.subscribe(p => {
            this.readPathParams(p);
            this.initializeData();
        });
    }

    private initializeData() {
        if (!this.listId || !this.docId) {
            return;
        }
        this.readDocument();
        this.listitems$ = this.listService.getItemList(this.listId, this.docId);
    }

    private readDocument() {
        if (!this.listId || !this.docId) {
            return;
        }
        this.doc$ = this.listService.getItemDocument(this.listId, this.docId);
    }

    private readPathParams(p: ParamMap) {
        this.listId = p.get('listId');
        this.docId = p.get('docId');
    }

    public onEdit() {
        this.isEditing = true;
    }

    ngOnDestroy(): void {
        this.paramMapSubscription?.unsubscribe();
    }

    onEditCancel() {
        this.isEditing = false;
    }

    onAddNewActivated(newItem: ItemListItem) {
        if (this.docId && this.listId) {
            this.listService.addItem(this.listId, this.docId, newItem).then(() => console.log('added!'));
        }
    }

    onDeleteActivated($event: ItemListItem) {
        if (this.docId && this.listId) {
            this.listService.deleteItem(this.listId, this.docId, $event).then(() => console.log('deleted!'));
        }
    }

    onEditItemActivated($event: ItemListItem) {
        if (this.docId && this.listId) {
            this.listService.updateItemListItem(this.listId, this.docId, $event).then(() => console.log('updated!'));
        }
    }

    onNavigateBack() {
        this.location.back();
    }

    onValueChanged($event: BasicList) {
        if (this.listId) {
            this.listService.updateItemDocument(this.listId, $event).then(r => this.readDocument())
        }
    }
}
