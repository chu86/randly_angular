import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from "rxjs";
import { BasicList } from "../../models/basic-list.model";
import { Router } from "@angular/router";
import { BasicListService } from "../../services/basic-list.service";
import { UserListService } from "../../services/user-list.service";
import { ModalService } from 'src/app/shared/service/modal.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MetaService } from 'src/app/shared/service/meta.service';

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
    public authService: AuthService,
    private router: Router,
    private userlistService: UserListService,
    private listService: BasicListService,
    private modalService: ModalService,
    private metaDataService: MetaService) {
  }

  public ngOnInit(): void {
    this.readData();
    this.updateMetaData();
  }

  onListSelected($event: string) {
    this.router.navigate(['list', $event]);
  }

  onEdit() {
    this.isEditing = true;
  }

  onAddClicked() {
    this.isAdding = !this.isAdding;
  }

  onConfirmClicked() {
    if (this.changes && this.changes.length > 0) {
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
  }

  onAddCanceled() {
    this.isAdding = false;
  }

  onAddNewActivated($event: BasicList) {
    this.listService.addCollection($event).then(() => console.log('added!'));
    this.isAdding = false;
  }

  onDeleteActivated($event: BasicList) {
    this.modalService.openConfirmModal('Lösche beschtätige', 'Bisch ganz sicher?').then(confirmed => {
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

  updateMetaData() {
    this.metaDataService.updateMetadata({
        title: "Home"
    });
  }
}
