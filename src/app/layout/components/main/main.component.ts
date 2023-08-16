import { Component } from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  public selectedList: string |undefined;

  constructor(public authService: AuthService) {
  }

  onListSelected($event: string) {
    this.selectedList = $event;
  }
}
