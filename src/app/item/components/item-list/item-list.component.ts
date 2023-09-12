import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ItemListItem} from "../../models/item-list-item.model";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ItemListForm} from "../../models/item-list-form.model";

@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnDestroy {

    private formSubscriptions: Subscription[] = [];

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

    @Output() addNewActivated = new EventEmitter<ItemListItem>();
    @Output() deleteActivated = new EventEmitter<ItemListItem>();
    @Output() editItemActivated = new EventEmitter<ItemListItem>();

    public form = new FormGroup<ItemListForm>({
        listitems: new FormArray<FormControl<ItemListItem>>([])
    })

    constructor(
        private fb: FormBuilder) {
    }

    private initFormGroup(items: ItemListItem[]) {
        this.listitemControls.clear();

        for (const val of items) {
            this.addListItem(val.name, val.count, val.order, val.id);
        }
    }

    get listitemControls() {
        return this.form.controls["listitems"] as FormArray;
    }

    addNew() {
        const newItem: ItemListItem = {
            name: '',
            count: '',
            order: this.getMaxOrder() + 1
        }
        this.addNewActivated.emit(newItem);
    }

    addListItem(name: string, count: string, order: number, id: string | undefined) {
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
        this.listitemControls.push(listItemForm);
    }

    onItemChanged(item: ItemListItem): void {
        this.editItemActivated.emit(item);
    }

    deleteItem(index: number) {
        if (this.listitems) {
            this.deleteActivated.emit(this.listitems[index])
        }
    }

    private getMaxOrder(): number {
        if (!this.listitems) {
            return 0;
        }
        return Math.max(...this.listitems.map(o => o.order), 1)
    }


    ngOnDestroy(): void {
        this.formSubscriptions.forEach(sub => sub.unsubscribe())
    }
}
