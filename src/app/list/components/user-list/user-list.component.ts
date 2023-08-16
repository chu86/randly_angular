import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BasicListService} from "../../services/basic-list.service";
import {Observable} from "rxjs";
import {BasicList} from "../../models/basic-list.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public list$: Observable<BasicList[]> | undefined;

  @Output() listSelected = new EventEmitter<string>();

  constructor(
      public listService: BasicListService, public router: Router){}

  public ngOnInit(): void {
    this.list$ = this.listService.getCollection();
  }

    public itemSelected(id: string) {
      this.listSelected.emit(id);
    }
}
