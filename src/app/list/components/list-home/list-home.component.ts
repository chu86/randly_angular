import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-home',
  templateUrl: './list-home.component.html',
  styleUrls: ['./list-home.component.scss']
})
export class ListHomeComponent {
  constructor(
    private router: Router) {
  }

  onListSelected($event: string) {
    this.router.navigate(['list', { outlets: { list: [ 'id', $event ] }}]);
  }
}
