import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {BasicList} from "../../models/basic-list.model";
import {Router} from "@angular/router";
import {BasicListService} from "../../services/basic-list.service";
import {UserListService} from "../../services/user-list.service";

@Component({
  selector: 'app-collections-layout',
  templateUrl: './collections-layout.component.html',
  styleUrls: ['./collections-layout.component.scss']
})
export class CollectionsLayoutComponent implements OnInit, OnDestroy {
  public list$: Observable<BasicList[]> | undefined;
  private subscription: Subscription | undefined;
  public isEditing = false;

  constructor(
    private router: Router,
    private userlistService: UserListService,
    private listService: BasicListService) {
  }

  public ngOnInit(): void {
    this.subscription = this.userlistService.getUserListIds().subscribe(userListIds => {
      this.list$ = this.listService.getUserCollections(userListIds);
    });
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

  addNew() {
    const collection: BasicList = {
      name: 'New Collection',
      created: new Date(),
      description1: ''
    }
    this.listService.addCollection(collection).then(() => console.log('added!'));
  }

  onDeleteActivated($event: BasicList) {
    this.listService.deleteCollection($event);
  }
}
