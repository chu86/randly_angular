import { Component, Input } from '@angular/core';
import {Location} from "@angular/common";
import { Router } from '@angular/router';
import { Breadcrumb } from '../../model/breadcrumb.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  @Input()
  public breadcrumbs: Breadcrumb[] = [];

  constructor(
    private location: Location,
    private router: Router) {
  }

  onNavigateBack() {
    this.location.back();
  }

  onNavigateHome() {
    this.router.navigate(['/']);
  }

  onNavigateCrumb(crumb: Breadcrumb) {
    this.router.navigate([...crumb.pathParams]);
  }

}
