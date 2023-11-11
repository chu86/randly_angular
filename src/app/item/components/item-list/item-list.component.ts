import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ItemListItem} from "../../models/item-list-item.model";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ItemListForm} from "../../models/item-list-form.model";
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ArrayService } from 'src/app/shared/service/array.service';

@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnDestroy {

    private formSubscriptions: Subscription[] = [];
    private changes: ItemListItem[] = [];

    @Input()
    get listitems(): ItemListItem[] | null | undefined {
        return this._listitems;
    }

    set listitems(value: ItemListItem[] | null | undefined) {
        this._listitems = value?.sort(({order:a}, {order:b}) => a-b);
        if (this._listitems) {
            this.initFormGroup(this._listitems);
        }
    }

    private _listitems: ItemListItem[] | null | undefined;

    @Input()
    public isEditing = false;

    @Output() deleteActivated = new EventEmitter<ItemListItem>();
    @Output() itemsChanged = new EventEmitter<ItemListItem[]>();

    public form = new FormGroup<ItemListForm>({
        listitems: new FormArray<FormControl<ItemListItem>>([])
    })

    constructor(
        private fb: FormBuilder,
        private arrayService: ArrayService) {
    }

    private initFormGroup(items: ItemListItem[]) {
        const formGroups: FormGroup[] = []
        for (const val of items) {
            formGroups.push(this.addListItem(val.name, val.count, val.order, val.id));
        }
        this.listitemControls = new FormArray(formGroups)
    }

    get listitemControls() {
        return this.form.controls["listitems"] as FormArray;
    }

    set listitemControls(value: FormArray) {
        this.form.controls["listitems"] = value;
    }

    addListItem(name: string, count: string, order: number, id: string | undefined): FormGroup {
        const listItemForm = this.fb.group({
            name: new FormControl(name, Validators.required),
            count: new FormControl(count, Validators.required),
            order: new FormControl(order, Validators.required),
            id: new FormControl(id)
        }, {updateOn: 'blur'});
        const subscription = listItemForm.valueChanges.subscribe(item => {
          if (item) {
            this.onItemChanged(item as ItemListItem);
          }
        })
        this.formSubscriptions.push(subscription);
        return listItemForm;
    }

    onItemChanged(item: ItemListItem): void {
        const sameItem = this.changes.find(c => c.id === item.id);
        if (sameItem) { 
          const itemIndex = this.changes.indexOf(sameItem);
          this.changes[itemIndex] = item;
        }
        else {
          this.changes.push(item);
        }
        this.itemsChanged.emit(this.changes);
    
      }

    deleteItem(index: number) {
        if (this.listitems) {
            this.deleteActivated.emit(this.listitems[index])
        }
    }

    ngOnDestroy(): void {
        this.formSubscriptions.forEach(sub => sub.unsubscribe())
    }

    drop(event: CdkDragDrop<string[]>) {
        if (!this.listitems){
            return;
        }
       moveItemInArray(this.listitems, event.previousIndex, event.currentIndex);
       this.listitems = this.arrayService.reorderArray(this.listitems) as ItemListItem[];
    }
}
