import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ItemListItem } from '../../models/item-list-item.model';
import { BasicListService } from 'src/app/list/services/basic-list.service';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.scss']
})
export class ItemAddComponent {

  @ViewChild('nameInput') nameInput: ElementRef | undefined;

  public name = new FormControl('');
  public count = new FormControl('');

  @Input()
  public listitems: ItemListItem[] | null = [];

  @Output()
  public confirm: EventEmitter<ItemListItem> = new EventEmitter<ItemListItem>();

  @Output()
  public cancel: EventEmitter<void> = new EventEmitter<void>();

  constructor(public listService: BasicListService) {
  }

  public onCancel(): void {
    this.cancel.emit();
    
  }

  public onConfirm(): void {
    const nameValue = this.name.getRawValue();
    if (!nameValue){
      return;
    }
    const newItem: ItemListItem = {
      name: this.name.getRawValue()!,
      order: this.listService.getMaxOrder(this.listitems) + 1,
      count: this.count.getRawValue()!
    }

    this.confirm.emit(newItem);
    this.name.reset();
    this.count.reset();
    this.nameInput?.nativeElement.focus();
  }
}
