import { Injectable } from '@angular/core';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private ngbModalService: NgbModal) { }


  public openConfirmModal(title: string, message: string, cancelText: string = 'Abbräche', confirmText: string = 'Beschtätige'): Promise<boolean> {
    const modalRef = this.ngbModalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.cancelText = cancelText;
    modalRef.componentInstance.confirmText = confirmText;
    return modalRef.result;
  }
}
