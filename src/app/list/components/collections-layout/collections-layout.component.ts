import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from "rxjs";
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
export class CollectionsLayoutComponent implements OnInit, OnDestroy {

  public list$: Observable<BasicList[]> | undefined;
  private subscription: Subscription | undefined;
  public isEditing = false;
  public filter: string | null | undefined;

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

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onEditClicked() {
    this.isEditing = true;
  }

  onEditCancel() {
    this.isEditing = false;
  }

  onAddNewActivated($event: BasicList) {
    this.listService.addCollection($event).then(() => console.log('added!'));
  }

  onDeleteActivated($event: BasicList) {
    this.modalService.openConfirmModal('Confirm delete', 'Are you sure?').then(confirmed => {
      if (confirmed) {
        this.listService.deleteCollection($event);
      }
    })
  }

  onValueChanged($event: BasicList) {
    this.listService.updateCollection($event).then(() => this.readData());
  }

  readData(): void {
    this.subscription?.unsubscribe();
    this.subscription = this.userlistService.getUserListIds().subscribe(userListIds => {
      this.list$ = this.listService.getUserCollections(userListIds);
    });

  }

  onFilterValueChanged($event: string | null) {
    this.filter = $event;
  }
}
