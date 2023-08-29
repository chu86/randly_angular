import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ListItem} from "../../models/list-item.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-list-layout',
  templateUrl: './list-layout.component.html',
  styleUrls: ['./list-layout.component.scss']
})
export class ListLayoutComponent {
  public documents$: Observable<ListItem[]> | undefined;
  constructor(
    private router: Router) {
  }

  onListSelected($event: string) {
    this.router.navigate(['list', { outlets: { list: [ 'id', $event ] }}]);
  }
}
