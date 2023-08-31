import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {BasicList} from "../../models/basic-list.model";
import {BasicListService} from "../../services/basic-list.service";

@Component({
  selector: 'app-list-layout-old',
  templateUrl: './list-layout-old.component.html',
  styleUrls: ['./list-layout-old.component.scss']
})
export class ListLayoutOldComponent implements OnInit {
  public list$: Observable<BasicList[]> | undefined;

  constructor(
    private router: Router,
    public listService: BasicListService) {
  }

  public ngOnInit(): void {
    this.list$ = this.listService.getCollection();
  }

  onListSelected($event: string) {
    this.router.navigate(['list', {outlets: {list: ['id', $event]}}]);
  }

  onFilterValueChanged($event: string | null) {
    // TODO umsetzung
  }
}
