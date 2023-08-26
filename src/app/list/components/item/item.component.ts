import {Component, OnInit} from '@angular/core';
import {BasicListService} from "../../services/basic-list.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {map, Observable} from "rxjs";
import {BasicList} from "../../models/basic-list.model";
import {ItemListItem} from "../../models/item-list-item.model";
import {FormArray, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  public doc$: Observable<BasicList> | undefined;
  public listitems$: Observable<ItemListItem[]> | undefined;
  public listId: string | null | undefined;
  public docId: string | null | undefined;

  form = this.fb.group({
    listitems: this.fb.array([])
  });


  public isEditing = false;

  constructor(
    private listService: BasicListService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
    this.route.paramMap.subscribe(params => {
      this.ngOnInit();
    });
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(p => {
      this.readPathParams(p);
      this.initializeData();
    });
  }

  private initializeData() {
    if (!this.listId || !this.docId) {
      return;
    }
    this.doc$ = this.listService.getItemDocument(this.listId, this.docId);
    this.listitems$ = this.listService.getItemList(this.listId, this.docId);
  }

  private readPathParams(p: ParamMap) {
    this.listId = p.get('listId');
    this.docId = p.get('docId');
  }

  public onEdit() {
    this.isEditing = true;
    this.listitems$?.pipe(map(items => {
      this.initFormGroup(items);
    }))
  }

  public cancelEdit() {
    this.isEditing = false;
  }

  private initFormGroup(test: ItemListItem[]) {
    this.listitems.clear();
    for (const val of test) {
      this.addListItem(val.name, val.count);
    }
  }


  get listitems() {
    return this.form.controls["listitems"] as FormArray;
  }

  addNew() {
    const listItemForm = this.fb.group({
      name: ['', Validators.required],
      count: ['', Validators.required]
    });

    this.listitems.push(listItemForm);
  }

  addListItem(name: string, count: string) {
    const listItemForm = this.fb.group({
      name: [name, Validators.required],
      count: [count, Validators.required]
    });

    this.listitems.push(listItemForm);
  }

  deleteItem(index: number) {
    this.listitems.removeAt(index);
  }

  public save() {
  }


}
