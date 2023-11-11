import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { map } from "rxjs";

export function authenticationGuard(): CanActivateFn {
    return () => {
      const authService: AuthService = inject(AuthService);
      const routerService: Router = inject(Router);
      
      return authService.authState$.pipe(map((user => {
        if (user){
          return true;
        }
        routerService.navigate(['login']);
        return false;
      })))
    };
  }