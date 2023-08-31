import {Injectable} from '@angular/core';
import {map, Observable, switchMap} from "rxjs";
import {addDoc, collection, collectionData, Firestore, query, where} from '@angular/fire/firestore';
import {UserList} from "../models/user-list.model";
import {AuthService} from "../../auth/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(public firestore: Firestore,
              private authService: AuthService) {
  }

  public getUserListIds(): Observable<string[]> {
    return this.authService.authState$.pipe(switchMap(user => {
      if (user) {
        return this.getCollection(user.uid).pipe(map(collection => {
          return collection.map(list => list.listUid);
        }));
      }
      return [];
    }));
  }

  public getUserLists(): Observable<UserList[]> {
    return this.authService.authState$.pipe(switchMap(user => {
      if (user) {
        return this.getCollection(user.uid);
      }
      return [];
    }));
  }

  public async add(document: UserList): Promise<void> {
    const path = `user-list`;
    const collection1 = collection(this.firestore, path);
    const docRef = await addDoc(collection1, document);
    console.log("Document written with ID: ", docRef.id);
  }

  private getCollection(userUid: string): Observable<UserList[]> {
    const collection1 = collection(this.firestore, 'user-list');
    const whereCondition = where('userUid', "==", userUid);
    const queryVar = query(collection1, whereCondition);
    return collectionData(queryVar, {idField: 'id'}) as Observable<UserList[]>;
  }

}
