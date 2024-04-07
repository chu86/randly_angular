import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import { MetaService } from 'src/app/shared/service/meta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainer implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router,
    private metaDataService: MetaService) {
  }

  ngOnInit(): void {
    this.updateMetaData()
  }

  updateMetaData() {
    this.metaDataService.updateMetadata({
        title: "Login"
    });
  }

  googleLogin() {
    this.authService.googleLogin().then(() => {
      this.router.navigateByUrl('/list');
    })
    .catch((error) => {
      console.log(error);
    });
  }
}
