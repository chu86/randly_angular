import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements AfterViewInit {

  @ViewChild('cancelButton')
  cancelButton: ElementRef | undefined;

  @Input()
  public title = '';

  @Input()
  public message = '';

  @Input()
  public cancelText = '';

  @Input()
  public confirmText = '';

  constructor(private activeModal: NgbActiveModal) {
                
  }

  ngAfterViewInit() {
    console.log(this.cancelButton?.nativeElement);
    this.cancelButton?.nativeElement.focus();
 }

  closeModal() {
    this.activeModal.close(false);
  }

  confirmModal() {
    this.activeModal.close(true);
  }
}
