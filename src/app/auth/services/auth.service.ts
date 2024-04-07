import {Injectable, OnDestroy} from '@angular/core';
import {GoogleAuthProvider} from 'firebase/auth';
import {Auth, authState, FacebookAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut, User, user, signInAnonymously} from "@angular/fire/auth";
import {BehaviorSubject, Observable, Subscription, firstValueFrom, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  public user: User | null | undefined;
  public userSubscription: Subscription | undefined;
  public user$;
  public authState$;
  private _initialized: BehaviorSubject<User | null | undefined> = new BehaviorSubject<User | null | undefined>(undefined);
  public initialized$: Observable<User | null | undefined> = this._initialized.asObservable();

  public constructor(
    public auth: Auth,
  ) {
    this.user$ = user(auth);
    this.authState$ = authState(auth)
    this.userSubscription = this.authState$.subscribe((aUser: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
      if (!aUser){
        //this.anonymousLogin(); Dont do this yet
      }
      
      this.user = aUser;
      this._initialized.next(this.user);
    })
  }

  public anonymousLogin(): Promise<void> {
    return signInAnonymously(this.auth).then(() => {
      console.log('You have been successfully logged in anonymously!');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  public login(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
      console.log(userCredential + " login successful.");
    });
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

  public isLoggedOutOrAnonymous(): Observable<boolean> {
    return this.user$.pipe(map((user)=>{
      return user == null || user.isAnonymous
    }));
  }

  public isAuthenticated(): boolean {
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

  private facebookSigninPopup(provider: FacebookAuthProvider): Promise<void> {
    return signInWithPopup(this.auth, provider)
      .then(result => {
        const user = result.user;
        console.log(user);
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
