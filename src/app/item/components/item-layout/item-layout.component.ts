import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from "rxjs";
import { BasicList } from "../../../list/models/basic-list.model";
import { ItemListItem } from "../../models/item-list-item.model";
import { BasicListService } from "../../../list/services/basic-list.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Location } from '@angular/common';
import { ModalService } from 'src/app/shared/service/modal.service';
import { AuthService } from 'src/app/auth/services/auth.service';

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
    public docChanges: BasicList | undefined | null;
    public itemChanges: ItemListItem[] = [];
    public isEditing = false;

    public paramMapSubscription: Subscription | undefined;

    constructor(
        public authService: AuthService,
        private listService: BasicListService,
        private route: ActivatedRoute,
        private location: Location,
        private modalService: ModalService) {
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

    onConfirm() {
        if (this.listId && this.docChanges) {
            this.listService.updateItemDocument(this.listId, this.docChanges).then(r => this.readDocument());
            console.log('doc updated!');
        }

        if (this.itemChanges && this.itemChanges.length > 0){
          this.listService.updateItemListItemBatch(this.listId!, this.docId!, this.itemChanges).then(() => {
            console.log('items updated!');
            this.isEditing = false;
          });
        }
        else {
          this.isEditing = false;
        }
      }

    ngOnDestroy(): void {
        this.paramMapSubscription?.unsubscribe();
    }

    onEditCancel() {
        this.isEditing = false;
        this.initializeData();
    }

    onAddConfirm(newItem: ItemListItem): void {
        if (this.docId && this.listId) {
            this.listService.addItem(this.listId, this.docId, newItem).then(() => console.log('added!'));
        }
    }

    onDeleteActivated($event: ItemListItem) {
        if (this.docId && this.listId) {
            this.modalService.openConfirmModal('Confirm delete', 'Are you sure?').then(confirmed => {
                if (confirmed) {
                    this.listService.deleteItem(this.listId!, this.docId!, $event).then(() => console.log('deleted!'));
                }
            })
        }
    }

    onEditItemActivated($event: ItemListItem[]) {
        this.itemChanges = $event;
    }

    onNavigateBack() {
        this.location.back();
    }

    onValueChanged($event: BasicList) {
        this.docChanges = $event;
    }

    onAddTag($event: { doc: BasicList, tag: string }) {
        if (this.listId) {
            const doc = $event.doc;
            if (!doc.tags){
                doc.tags = [];
            }
            doc.tags.push($event.tag)
            this.listService.updateItemDocument(this.listId, doc).then(r => this.readDocument());
        }
    }

    onDeleteTag($event: { doc: BasicList, tagIndex: number }) {
        if (this.listId) {
            const doc = $event.doc;
            doc.tags.splice($event.tagIndex, 1);
            this.listService.updateItemDocument(this.listId, doc).then(r => this.readDocument());
        }
    }
}
