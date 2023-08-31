import { Injectable } from '@angular/core';
import {addDoc, collection, collectionData, Firestore, query, where} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {BasicList} from "../models/basic-list.model";
import {Share} from "../models/share.model";
import {ListItem} from "../models/list-item.model";

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(public firestore: Firestore) { }

  public get(listId: string): Observable<Share[]> {
    const collection1 = collection(this.firestore, 'share');
    const whereCondition = where('listId', '==', listId);
    const queryVar = query(collection1, whereCondition);
    return collectionData(queryVar, {idField: 'id'}) as Observable<Share[]>;
  }

  public async add(document: Share): Promise<void> {
    const path = `share`;
    const collection1 = collection(this.firestore, path);
    const docRef = await addDoc(collection1, document);
    console.log("Document written with ID: ", docRef.id);
  }
}
