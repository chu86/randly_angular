import {Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  query,
  where
} from "@angular/fire/firestore";
import {from, map, Observable} from "rxjs";
import {Invite} from "../models/share.model";

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  constructor(public firestore: Firestore) {
  }

  public get(id: string): Observable<Invite> {
    const path = doc(this.firestore, `invite/${id}`);
    return from(getDoc(path)).pipe(map(docSnap =>
      docSnap.data() as Invite))
  }

  public getByListId(listId: string): Observable<Invite[]> {
    const collection1 = collection(this.firestore, 'invite');
    const whereCondition = where('listId', '==', listId);
    const queryVar = query(collection1, whereCondition);
    return collectionData(queryVar, {idField: 'id'}) as Observable<Invite[]>;
  }

  public async add(document: Invite): Promise<void> {
    const path = `invite`;
    const collection1 = collection(this.firestore, path);
    const docRef = await addDoc(collection1, document);
    console.log("Document written with ID: ", docRef.id);
  }

  public async delete(document: Invite): Promise<void> {
    const path = doc(this.firestore, `invite/${document.id}`);
    await deleteDoc(path).then(() => {
      console.log('document deleted.')
    });
  }
}
