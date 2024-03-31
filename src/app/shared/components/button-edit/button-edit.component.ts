import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-edit',
  templateUrl: './button-edit.component.html',
  styleUrls: ['./button-edit.component.scss']
})
export class ButtonEditComponent {

  @Input()
  public canEdit = false;
  @Input()
  public canAdd = false;
  @Input()
  public isEditing = false;

  @Output()
  public editClicked: EventEmitter<void> = new EventEmitter();
  @Output()
  public addClicked: EventEmitter<void> = new EventEmitter();
  @Output()
  public cancel: EventEmitter<void> = new EventEmitter();
  @Output()
  public confirm: EventEmitter<void> = new EventEmitter();

  public onEditClicked(): void {
    this.editClicked.emit();
  }

  public onAddClicked(): void {
    this.addClicked.emit();
  }

  public onEditCancel(): void {
    this.cancel.emit();
  }

  public onConfirm(): void {
    this.confirm.emit();
  }
}
