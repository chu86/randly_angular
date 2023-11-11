import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import {Location} from "@angular/common";
import { MetaService } from '../shared/service/meta.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public authService: AuthService, 
    private location: Location,
    private metaDataService: MetaService){

  }
  ngOnInit(): void {
    this.updateMetaData();
  }

  onNavigateBack() {
    this.location.back();
  }

  updateMetaData() {
    this.metaDataService.updateMetadata({
        title: "Profile"
    });
  }
}
