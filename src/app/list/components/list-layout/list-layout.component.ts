import { Component, OnInit } from '@angular/core';
import { firstValueFrom, map, Observable, Subscription } from "rxjs";
import { BasicList } from "../../models/basic-list.model";
import { BasicListService } from "../../services/basic-list.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { InviteService } from "../../services/invite.service";
import { Invite } from "../../models/share.model";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { InviteModalComponent } from "../../../invite/components/invite-modal/invite-modal.component";
import { RandomService } from "../../services/random.service";
import { RandomModalComponent } from "../random-modal/random-modal.component";
import { ModalService } from 'src/app/shared/service/modal.service';

@Component({
  selector: 'app-list-layout',
  templateUrl: './list-layout.component.html',
  styleUrls: ['./list-layout.component.scss']
})
export class ListLayoutComponent implements OnInit {
  public doc$: Observable<BasicList> | undefined;
  public listItems$: Observable<BasicList[]> | undefined;
  public filteredListItems$: Observable<BasicList[]> | undefined;
  public listId: string | null | undefined;
  public isEditing = false;
  public filter: string | null | undefined;

  modalRef: NgbModalRef | null = null;

  public changes: BasicList | undefined = undefined;
  public itemChanges: BasicList[] = [];

  constructor(
    private listService: BasicListService,
    private inviteService: InviteService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private ngbModal: NgbModal,
    private randomService: RandomService,
    private modalService: ModalService) {
    this.route.paramMap.subscribe(() => {
      this.ngOnInit();
    });
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(p => {
      this.listId = p.get('id');
      if (this.listId) {
        this.readDocument();
        this.readListItems();
      }
    });
      }

  private readListItems() {
    if (!this.listId) {
      return;
    }
    this.listItems$ = this.listService.getListItems(this.listId);
  }

  private readDocument() {
    if (!this.listId) {
      return;
    }
    this.doc$ = this.listService.getCollectionDocument(this.listId);
  }

  public onItemSelected(itemId: string) {
    this.router.navigate(['item', this.listId, itemId]);

  }

  onEdit() {
    this.isEditing = true;
  }

  onCancel() {
    this.isEditing = false;
  }

  onNavigateBack() {
    this.location.back();
  }

  onDeleteActivated($event: BasicList) {
    if (this.listId) {
      this.modalService.openConfirmModal('Confirm delete', 'Are you sure?').then(confirmed => {
        if (confirmed) {
          this.listService.deleteListItem(this.listId!, $event).then(() => console.log('deleted!'));
        }
      })
    }
  }

  onAddNewActivated($event: BasicList) {
    if (this.listId) {
      this.listService.addListItem(this.listId, $event).then(() => console.log('added!'));
    }
  }

  onConfirmClicked() {
    if (this.changes) {
      this.listService.updateCollection(this.changes).then(() => {
        console.log('main updated!');
        this.readDocument();
      });
    }

    if (this.itemChanges && this.itemChanges.length > 0) {
      this.listService.updateCollectionItemBatch(this.listId!, this.itemChanges).then(() => {
        console.log('item updated!');
        this.isEditing = false;
      });
    }
    else {
      this.isEditing = false;
    }
  }

  onValueChanged($event: BasicList) {
    this.changes = $event;
  }

  async onShareClicked() {
    if (!this.listId) {
      return;
    }
    const listId = this.listId;
    const newShare: Invite = {
      listId
    }
    this.inviteService.getByListId(this.listId).pipe(map(share => {
      if (share && share.length > 0) {
        this.showModal(share[0]);
      } else {
        this.inviteService.add(newShare).then(() => {
          this.inviteService.get(listId).pipe(map(share => {
            this.showModal(share);
          }));
        })
      }
    })).subscribe();
  }

  onItemValueChanged($event: BasicList[]) {
    this.itemChanges = $event;
    console.table(this.itemChanges);
  }

  private showModal(share: Invite) {
    this.modalRef = this.ngbModal.open(InviteModalComponent);
    this.modalRef.componentInstance.inviteUid = share.id;
  }

  async onFullRandomClicked() {
    if (!this.listItems$) {
      return;
    }
    const items = await firstValueFrom(this.listItems$);
    const filteredItems = this.listService.filterSortListItems(items, this.filter);
    const randomItem = this.randomService.getArrayRandom(filteredItems);
    this.modalRef = this.ngbModal.open(RandomModalComponent, { fullscreen: true });
    this.modalRef.componentInstance.listItem = randomItem;
    this.modalRef.componentInstance.listUid = this.listId;
  }

  onFilterValueChanged($event: string | null) {
    this.filter = $event;
  }
}
