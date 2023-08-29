import {Injectable} from '@angular/core';
import {BasicList} from "../models/basic-list.model";
import {from, map, Observable} from "rxjs";
import {
  addDoc,
  collection,
  collectionData, deleteDoc,
  doc,
  Firestore,
  getDoc,
  orderBy,
  query,
  setDoc,
  where
} from '@angular/fire/firestore';
import {AuthService} from "../../auth/services/auth.service";
import {ListItem} from "../models/list-item.model";
import {ItemListItem} from "../../item/models/item-list-item.model";

@Injectable({
  providedIn: 'root'
})
export class BasicListService {

  public test$: Observable<BasicList[]> | undefined;

  constructor(public firestore: Firestore,
              public authService: AuthService) {
  }

  public getCollection(): Observable<BasicList[]> {
    const collection1 = collection(this.firestore, 'basic-list');
    const whereCondition = where('users', "array-contains", this.authService.user?.uid);
    const queryVar = query(collection1, whereCondition);
    return collectionData(queryVar, {idField: 'id'}) as Observable<BasicList[]>;
  }

  public getCollectionDocument(id: string): Observable<BasicList> {
    const path = doc(this.firestore, `basic-list/${id}`);
    return from(getDoc(path)).pipe(map(docSnap =>
      docSnap.data() as BasicList))
  }

  public getListItems(id: string): Observable<ListItem[]> {
    const collection1 = collection(this.firestore, `basic-list/${id}/listItems`);
    const orderByCondition = orderBy('order', 'asc');
    const queryVar = query(collection1, orderByCondition);
    return collectionData(queryVar, {idField: 'id'}) as Observable<ListItem[]>;
  }

  public getItemDocument(listId: string, docId: string): Observable<BasicList> {
    const path = doc(this.firestore, `basic-list/${listId}/listItems/${docId}`);
    return from(getDoc(path)).pipe(map(docSnap =>
      docSnap.data() as BasicList))
  }

  public getItemList(id: string, docId: string): Observable<ItemListItem[]> {
    const collection1 = collection(this.firestore, `basic-list/${id}/listItems/${docId}/itemlist`);
    const orderByCondition = orderBy('order', 'asc');
    const queryVar = query(collection1, orderByCondition);
    return collectionData(queryVar, {idField: 'id'}) as Observable<ItemListItem[]>;
  }

  public async addItem(listId: string, docId: string, document: ItemListItem): Promise<void> {
    const path = `basic-list/${listId}/listItems/${docId}/itemlist`;
    const collection1 = collection(this.firestore, path);
    const docRef = await addDoc(collection1, document);
    console.log("Document written with ID: ", docRef.id);
  }

  public async updateItem(listId: string, docId: string, document: ItemListItem): Promise<void> {
    const path = doc(this.firestore, `basic-list/${listId}/listItems/${docId}/itemlist/${document.id}`);
    await setDoc(path, document).then(() => {
      console.log('document updated.')
    });
  }

  public async deleteItem(listId: string, docId: string, document: ItemListItem): Promise<void> {
    const path = doc(this.firestore, `basic-list/${listId}/listItems/${docId}/itemlist/${document.id}`);
    await deleteDoc(path).then(() => {
      console.log('document deleted.')
    });
  }

  public async addListItem(listId: string, document: ListItem): Promise<void> {
    const path = `basic-list/${listId}/listItems`;
    const collection1 = collection(this.firestore, path);
    const docRef = await addDoc(collection1, document);
    console.log("Document written with ID: ", docRef.id);
  }

  public async deleteListItem(listId: string, document: ListItem): Promise<void> {
    const path = doc(this.firestore, `basic-list/${listId}/listItems/${document.id}`);
    await deleteDoc(path).then(() => {
      console.log('document deleted.')
    });
  }

  public async updateListItem(listId: string, document: ListItem): Promise<void> {
    const path = doc(this.firestore, `basic-list/${listId}/listItems/${document.id}`);
    await setDoc(path, document).then(() => {
      console.log('document updated.')
    });
  }
}
