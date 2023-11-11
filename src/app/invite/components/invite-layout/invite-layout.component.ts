import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { firstValueFrom, map, Observable, Subscription, switchMap } from "rxjs";
import { InviteService } from "../../../list/services/invite.service";
import { Invite } from "../../../list/models/share.model";
import { BasicList } from "../../../list/models/basic-list.model";
import { BasicListService } from "../../../list/services/basic-list.service";
import { UserListService } from "../../../list/services/user-list.service";
import { UserList } from "../../../list/models/user-list.model";
import { AuthService } from "../../../auth/services/auth.service";
import { UserListRole } from "../../../list/models/user-list-role-enum.model";
import { MetaService } from 'src/app/shared/service/meta.service';

@Component({
  selector: 'app-invite-layout',
  templateUrl: './invite-layout.component.html',
  styleUrls: ['./invite-layout.component.scss']
})
export class InviteLayoutComponent implements OnInit, OnDestroy {
  public paramMapSubscription: Subscription | undefined;

  public inviteDoc$: Observable<Invite> | undefined;
  public listDoc$: Observable<BasicList> | undefined;
  public userListDoc$: Observable<UserList | undefined> | undefined;

  private id: string | null | undefined;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private inviteService: InviteService,
    private listService: BasicListService,
    private userListService: UserListService,
    private authService: AuthService,
    private metaDataService: MetaService) {
  }

  public ngOnInit(): void {
    this.paramMapSubscription = this.route.paramMap.subscribe(p => {
      this.readPathParams(p);
      this.initializeData();
    });
  }

  private readPathParams(p: ParamMap) {
    this.id = p.get('id');
  }

  ngOnDestroy(): void {
    this.paramMapSubscription?.unsubscribe();
  }

  private initializeData() {
    if (!this.id) {
      return;
    }
    this.inviteDoc$ = this.inviteService.get(this.id);
    this.listDoc$ = this.inviteDoc$.pipe(switchMap(invite => {
      return this.listService.getCollectionDocument(invite.listId);
    }));
    this.userListDoc$ = this.inviteDoc$.pipe(switchMap(invite => {
      return this.userListService.getAllForUser().pipe(map(lists => {
        return lists.find(l => l.listUid == invite.listId)
      }))
    }))
  }

  onNavigateToLists() {
    this.router.navigate(['list']);
  }

  async onAccept() {
    if (!this.inviteDoc$ || !this.authService.user) {
      return;
    }
    const value = await firstValueFrom(this.inviteDoc$);

    const userList: UserList = {
      listUid: value.listId,
      userUid: this.authService.user?.uid,
      role: UserListRole.Participant
    }
    this.userListService.add(userList).then(() => {
      console.log('userlist added.')
      this.inviteService.delete(value).then(() => {
        this.onNavigateToLists();
      })
    })
  }

  updateMetaData() {
    this.metaDataService.updateMetadata({
      title: "Invite"
    });
  }
}
