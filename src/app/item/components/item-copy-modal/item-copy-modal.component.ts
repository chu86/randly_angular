import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, switchMap } from 'rxjs';
import { BasicList } from 'src/app/list/models/basic-list.model';
import { UserListService } from 'src/app/list/services/user-list.service';
import { BasicListService } from 'src/app/list/services/basic-list.service';

@Component({
  selector: 'app-item-copy-modal',
  templateUrl: './item-copy-modal.component.html',
  styleUrls: ['./item-copy-modal.component.scss']
})
export class ItemCopyModalComponent implements OnInit {
  public collections$: Observable<BasicList[]> | undefined;

  constructor(
    public activeModal: NgbActiveModal,
    private userListService: UserListService,
    private listService: BasicListService
  ) {}

  ngOnInit(): void {
    this.collections$ = this.userListService.getUserListIds().pipe(
      switchMap(userListIds => this.listService.getUserCollections(userListIds))
    );
  }

  onSelect(collection: BasicList) {
    if (!collection.id) {
      return;
    }
    this.activeModal.close(collection.id);
  }

  onCancel() {
    this.activeModal.dismiss();
  }
}
