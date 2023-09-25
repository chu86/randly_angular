import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ItemListItem } from '../../models/item-list-item.model';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.scss']
})
export class ItemAddComponent {

  @ViewChild('nameInput') nameInput: ElementRef | undefined;

  public name = new FormControl('');
  public count = new FormControl('');

  @Output()
  public confirm: EventEmitter<ItemListItem> = new EventEmitter<ItemListItem>();

  @Output()
  public cancel: EventEmitter<void> = new EventEmitter<void>();

  public onCancel(): void {
    this.cancel.emit();
    
  }

  public onConfirm(): void {
    const newItem: ItemListItem = {
      name: this.name.getRawValue()!,
      order: 0,
      count: this.count.getRawValue()!
    }

    this.confirm.emit(newItem);
    this.name.reset();
    this.count.reset();
    this.nameInput?.nativeElement.focus();
  }
}
