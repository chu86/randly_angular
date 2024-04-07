import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MetaService } from 'src/app/shared/service/meta.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  constructor(public authService: AuthService,
    private metaDataService: MetaService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.updateMetaData()
  }

  updateMetaData() {
    this.metaDataService.updateMetadata({
        title: "Login"
    });
  }

  goToRecipies() {
    this.router.navigate
  }
}
