import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-quick',
  templateUrl: './user-quick.component.html',
  styleUrls: ['./user-quick.component.scss']
})
export class UserQuickComponent {

  public constructor(public authService: AuthService,
    public router: Router) {
  }

  onProfileActivated() {
    this.router.navigate(['profile']);
  }

  onLoginActivated() {
    this.router.navigate(['login']);
  }
}
