import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {BasicList} from "../../models/basic-list.model";
import {Router} from "@angular/router";
import {BasicListService} from "../../services/basic-list.service";
import {UserListService} from "../../services/user-list.service";

@Component({
  selector: 'app-list-layout',
  templateUrl: './list-layout.component.html',
  styleUrls: ['./list-layout.component.scss']
})
export class ListLayoutComponent implements OnInit, OnDestroy {
  public list$: Observable<BasicList[]> | undefined;
  private subscription: Subscription | undefined;

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

  onFilterValueChanged($event: string | null) {
    // TODO umsetzung
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
