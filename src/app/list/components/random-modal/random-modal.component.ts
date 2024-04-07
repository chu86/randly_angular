import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {BasicList} from "../../models/basic-list.model";

@Component({
  selector: 'app-random-modal',
  templateUrl: './random-modal.component.html',
  styleUrls: ['./random-modal.component.scss']
})
export class RandomModalComponent {


  @Input()
  public listItem: BasicList | undefined;

  @Input()
  public listUid: number | undefined;

  constructor(private activeModal: NgbActiveModal,
              private router: Router) {
  }

  closeModal() {
    this.activeModal.close();
  }

  showItem() {
    if (!this.listUid || ! this.listItem){
      return;
    }
    this.activeModal.close();
    this.router.navigate(['item', this.listUid, this.listItem.id]);
  }

  rollAgain() {
    this.activeModal.close(true);
  }
}
