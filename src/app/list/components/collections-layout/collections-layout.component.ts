import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, switchMap } from "rxjs";
import { BasicList } from "../../models/basic-list.model";
import { Router } from "@angular/router";
import { BasicListService } from "../../services/basic-list.service";
import { UserListService } from "../../services/user-list.service";
import { ModalService } from 'src/app/shared/service/modal.service';

@Component({
  selector: 'app-collections-layout',
  templateUrl: './collections-layout.component.html',
  styleUrls: ['./collections-layout.component.scss']
})
export class CollectionsLayoutComponent implements OnInit {

  public list$: Observable<BasicList[]> | undefined;
  public isEditing = false;
  public isAdding = false;
  public filter: string | null | undefined;

  public changes: BasicList[] = [];
  public adds: BasicList | undefined = undefined;

  constructor(
    private router: Router,
    private userlistService: UserListService,
    private listService: BasicListService,
    private modalService: ModalService) {
  }

  public ngOnInit(): void {
    this.readData();
  }

  onListSelected($event: string) {
    this.router.navigate(['list', $event]);
  }

  onEditClicked() {
    this.isEditing = true;
  }

  onAddClicked() {
    this.isAdding = true;
  }

  onConfirmClicked() {
    if (this.changes && this.changes.length > 0){
      this.listService.updateCollectionBatch(this.changes).then(() => {
        console.log('updated!');
        this.isEditing = false;
      });
    }
    else {
      this.isEditing = false;
    }
  }

  onCancel() {
    this.isEditing = false;
    this.isAdding = false;
  }

  onAddNewActivated($event: BasicList) {
    this.listService.addCollection($event).then(() => console.log('added!'));
    this.isAdding = false;
  }

  onDeleteActivated($event: BasicList) {
    this.modalService.openConfirmModal('Confirm delete', 'Are you sure?').then(confirmed => {
      if (confirmed) {
        this.listService.deleteCollection($event);
      }
    })
  }

  onValueChanged($event: BasicList[]) {
    this.changes = $event;
    console.table(this.changes);
  }

  readData(): void {
    this.list$ = this.userlistService.getUserListIds().pipe(switchMap(userListIds => {
      return this.listService.getUserCollections(userListIds);
    }))

  }

  onFilterValueChanged($event: string | null) {
    this.filter = $event;
  }
}
