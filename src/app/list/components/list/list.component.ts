import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {BasicList} from "../../models/basic-list.model";
import {BasicListService} from "../../services/basic-list.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public doc$: Observable<BasicList> | undefined;
  public listId: string | null | undefined;

  constructor(
    private listService: BasicListService,
    private route: ActivatedRoute,
    private router: Router) {
    this.route.paramMap.subscribe(params => {
      this.ngOnInit();
    });
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(p => {
      this.listId = p.get('id')
      if (this.listId) {
        this.doc$ = this.listService.getCollectionDocument(this.listId);
      }
    });

  }

  public onItemSelected($event: string) {
    this.router.navigate(['item', this.listId, $event]);

  }
}
