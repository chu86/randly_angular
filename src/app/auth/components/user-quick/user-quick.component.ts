import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-user-quick',
  templateUrl: './user-quick.component.html',
  styleUrls: ['./user-quick.component.scss']
})
export class UserQuickComponent {
    public constructor(public authService: AuthService) {
    }
}
