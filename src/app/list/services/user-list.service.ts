import {Injectable} from '@angular/core';
import {firstValueFrom, map, Observable, switchMap} from "rxjs";
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore, query, where} from '@angular/fire/firestore';
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
        return this.getByUserUid(user.uid).pipe(map(collection => {
          return collection.map(list => list.listUid);
        }));
      }
      return [];
    }));
  }

  public getByListUid(listUid: string): Promise<UserList[]> {
    return firstValueFrom(this.authService.authState$.pipe(switchMap(user => {
      if (user) {
        return this.getByUserUidAndListUid(user.uid, listUid);
      }
      return [];
    })));
  }

  public getAllForUser(): Observable<UserList[]> {
    return this.authService.authState$.pipe(switchMap(user => {
      if (user) {
        return this.getByUserUid(user.uid);
      }
      return [];
    }));
  }

  public async add(document: UserList): Promise<void> {
    const path = `user-list`;
    const collection1 = collection(this.firestore, path);
    const docRef = await addDoc(collection1, document);
    console.log("UserList added with ID: ", docRef.id);
  }

  private getByUserUid(userUid: string): Observable<UserList[]> {
    const collection1 = collection(this.firestore, 'user-list');
    const whereCondition = where('userUid', "==", userUid);
    const queryVar = query(collection1, whereCondition);
    return collectionData(queryVar, {idField: 'id'}) as Observable<UserList[]>;
  }

  private getByUserUidAndListUid(userUid: string, listUid: string): Observable<UserList[]> {
    const collection1 = collection(this.firestore, 'user-list');
    const whereCondition1 = where('userUid', "==", userUid);
    const whereCondition2 = where('listUid', "==", listUid);
    const queryVar = query(collection1, whereCondition1, whereCondition2);
    return collectionData(queryVar, {idField: 'id'}) as Observable<UserList[]>;
  }

  public async delete(document: UserList): Promise<void> {
    if (!document.id){
      throw new Error('Invalid User-List Id.')
    }
    const path = doc(this.firestore, `user-list/${document.id}`);
    await deleteDoc(path);
  }
}
