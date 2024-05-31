import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl} from "@angular/forms";
import { BasicList } from '../../models/basic-list.model';

@Component({
  selector: 'app-list-item-add',
  templateUrl: './list-item-add.component.html',
  styleUrls: ['./list-item-add.component.scss']
})
export class ListItemAddComponent implements AfterViewInit {


  @ViewChild('nameInput') nameInput: ElementRef | undefined;

  public name = new FormControl('');

  @Output()
  public confirm: EventEmitter<BasicList> = new EventEmitter<BasicList>();

  @Output()
  public cancel: EventEmitter<void> = new EventEmitter<void>();

  public onCancel(): void {
    this.cancel.emit();
    this.name.reset();
  }

  public onConfirm(): void {
    const newItem: BasicList = {
      name: this.name.getRawValue()!,
      description1: '',
      created: new Date(),
      tags: []
    }
    this.name.reset();
    this.confirm.emit(newItem);
  }

  public ngAfterViewInit(): void {
    this.nameInput?.nativeElement.focus();
  }

}
