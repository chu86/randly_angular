import {Component, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {BasicList} from "../../models/basic-list.model";
import {BasicListService} from "../../services/basic-list.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {ListItem} from "../../models/list-item.model";
import {InviteService} from "../../services/invite.service";
import {Invite} from "../../models/share.model";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public doc$: Observable<BasicList> | undefined;
  public listItems$: Observable<ListItem[]> | undefined;
  public listId: string | null | undefined;
  public isEditing = false;

  constructor(
    private listService: BasicListService,
    private inviteService: InviteService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) {
    this.route.paramMap.subscribe(() => {
      this.ngOnInit();
    });
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(p => {
      this.listId = p.get('id')
      if (this.listId) {
        this.doc$ = this.listService.getCollectionDocument(this.listId);
        this.listItems$ = this.listService.getListItems(this.listId);
      }
    });
  }

  public onItemSelected($event: string) {
    this.router.navigate(['item', this.listId, $event]);

  }

  onEditClicked() {
    this.isEditing = true;
  }

  onEditCancel() {
    this.isEditing = false;
  }

  onNavigateBackClicked() {
    this.location.back();
  }

  onDeleteActivated($event: ListItem) {
    if (this.listId) {
      this.listService.deleteListItem(this.listId, $event).then(r => console.log('deleted!'));
    }
  }

  onAddNewActivated($event: ListItem) {
    if (this.listId) {
      this.listService.addListItem(this.listId, $event).then(r => console.log('added!'));
    }
  }

  onEditItemActivated($event: ListItem) {
    if (this.listId) {
      this.listService.updateListItem(this.listId, $event).then(r => console.log('updated!'));
    }
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
        console.table(share[0]);
      } else {
        this.inviteService.add(newShare).then(() => {
          this.inviteService.get(listId).pipe(map(share => {
            console.table(share);
          }));
        })
      }
    })).subscribe();
  }
}
