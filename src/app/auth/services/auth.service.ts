import {Injectable, OnDestroy} from '@angular/core';
import {GoogleAuthProvider} from 'firebase/auth';
import {Auth, authState, signInWithPopup, signOut, User, user} from "@angular/fire/auth";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  public user: User | null | undefined;
  public userSubscription: Subscription | undefined;
  public user$;
  public authState$;

  public constructor(
    public auth: Auth,
  ) {
    this.user$ = user(auth);
    this.authState$ = authState(auth)
    this.userSubscription = this.authState$.subscribe((aUser: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
      this.user = aUser;
      console.log(aUser);
    })
  }

  public googleLogin(): Promise<void> {
    return this.googleSigninPopup(new GoogleAuthProvider());
  }

  public logout(): Promise<void> {
    return signOut(this.auth)
      .then(() => {
        console.log('You have been successfully signed out!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public isLoggedIn(): boolean {
    return this.user != null && this.user.uid != null;
  }

  private googleSigninPopup(provider: GoogleAuthProvider): Promise<void> {
    return signInWithPopup(this.auth, provider)
      .then(() => {
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
