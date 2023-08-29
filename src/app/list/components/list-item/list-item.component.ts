import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {BasicListService} from "../../services/basic-list.service";
import {ListItem} from "../../models/list-item.model";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ListItemForm} from "../../models/list-item-form.model";

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnDestroy {

    @Output() itemSelected = new EventEmitter<string>();
    @Output() addNewActivated = new EventEmitter<ListItem>();
    @Output() deleteActivated = new EventEmitter<ListItem>();
    @Output() editItemActivated = new EventEmitter<ListItem>();

    @Input()
    public isEditing = false;

    @Input()
    get listId(): string | undefined {
        return this._listId;
    }

    set listId(value: string | undefined) {
        this._listId = value;
    }

    private _listId: string | undefined;

    @Input()
    get listitems(): ListItem[] | null | undefined {
        return this._listitems;
    }

    set listitems(value: ListItem[] | null | undefined) {
        this._listitems = value;
        if (this._listitems) {
            this.initFormGroup(this._listitems);
        }
    }

    private _listitems: ListItem[] | null | undefined;

    private formSubscriptions: Subscription[] = [];
    public form = new FormGroup<ListItemForm>({
        listitems: new FormArray<FormControl<ListItem>>([])
    })

    constructor(
        private listService: BasicListService,
        private fb: FormBuilder) {
    }

    private initFormGroup(items: ListItem[]) {
        this.listitemControls.clear();

        for (const val of items) {
            this.addListItem(val.name, val.order, val.id);
        }
    }

    addListItem(name: string, order: number, id: string | undefined) {
        const listItemForm = this.fb.group({
            name: new FormControl(name, Validators.required),
            order: new FormControl(order, Validators.required),
            id: new FormControl(id)
        }, {updateOn: 'blur'});
        const subscription = listItemForm.valueChanges.subscribe(item => {
            if (item) {
                this.onItemChanged(item as ListItem);
            }
        })
        this.formSubscriptions.push(subscription);
        this.listitemControls.push(listItemForm);
    }

    onItemChanged(item: ListItem): void {
        this.editItemActivated.emit(item);
    }

    get listitemControls() {
        return this.form.controls["listitems"] as FormArray;
    }

    public onItemSelected(id: string | undefined) {
        if (id) {
            this.itemSelected.emit(id);
        }
    }

    deleteItem(index: number) {
        if (this.listitems) {
            this.deleteActivated.emit(this.listitems[index])
        }
    }

    addNew() {
        const newItem: ListItem = {
            name: '',
            order: this.getMaxOrder() + 1
        }
        this.addNewActivated.emit(newItem);
    }

    private getMaxOrder(): number {
        if (!this.listitems) {
            return 0;
        }
        return Math.max(...this.listitems.map(o => o.order))
    }

    ngOnDestroy(): void {
        this.formSubscriptions.forEach(sub => sub.unsubscribe())
    }
}
