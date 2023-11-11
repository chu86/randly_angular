import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";

export function authenticationGuard(): CanActivateFn {
    return () => {
      const authService: AuthService = inject(AuthService);
      const routerService: Router = inject(Router);
      
      if (authService.isAuthenticated() ) {
        return true;
      }
      routerService.navigate(['login']);
      return false;
    };
  }