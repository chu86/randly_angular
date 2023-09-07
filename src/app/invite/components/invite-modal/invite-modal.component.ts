import {Component, Inject, Input} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {FormControl} from "@angular/forms";
import {WINDOW} from "../../../shared/token/window.token";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-invite-modal',
  templateUrl: './invite-modal.component.html',
  styleUrls: ['./invite-modal.component.scss']
})
export class InviteModalComponent {

  public urlInput = new FormControl({value: '', disabled: true});

  get inviteUid(): string | undefined {
    return this._inviteUid;
  }

  @Input()
  set inviteUid(value: string | undefined) {
    this._inviteUid = value;
    this.combinedUrl = `${this.document.location.origin}/invite/${this._inviteUid}`
    this.urlInput.patchValue(this.combinedUrl);
  }

  private _inviteUid: string | undefined;

  public combinedUrl: string | undefined;


  constructor(@Inject(DOCUMENT) private document: Document,
              @Inject(WINDOW) private window: Window,
              private activeModal: NgbActiveModal) {
  }


  onCopyActivated() {
    if (!this.combinedUrl) {
      return;
    }
    this.window.navigator.clipboard.writeText(this.combinedUrl);
  }

  closeModal() {
    this.activeModal.close();
  }
}
