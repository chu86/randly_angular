import { Component } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import {Location} from "@angular/common";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(public authService: AuthService, 
    private location: Location){

  }

  onNavigateBack() {
    this.location.back();
  }
}
