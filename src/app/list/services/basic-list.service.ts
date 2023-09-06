import {Injectable} from '@angular/core';
import {BasicList} from "../models/basic-list.model";
import {from, map, Observable} from "rxjs";
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  documentId,
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
import {UserListService} from "./user-list.service";
import {UserList} from "../models/user-list.model";
import {UserListRole} from "../models/user-list-role-enum.model";

@Injectable({
    providedIn: 'root'
})
export class BasicListService {

    constructor(public firestore: Firestore,
                public authService: AuthService,
                public userListService: UserListService) {
    }

    public getUserCollections(listIds: string[]): Observable<BasicList[]> {
        const collection1 = collection(this.firestore, 'basic-list');
        const whereCondition = where(documentId(), "in", listIds);
        const queryVar = query(collection1, whereCondition);
        return collectionData(queryVar, {idField: 'id'}) as Observable<BasicList[]>;
    }

    public getCollectionDocument(id: string): Observable<BasicList> {
        const path = doc(this.firestore, `basic-list/${id}`);
        return from(getDoc(path)).pipe(map(docSnap => ({id, ...docSnap.data()} as BasicList)))
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

    public async updateItemDocument(listId: string, document: BasicList): Promise<void> {
        const path = doc(this.firestore, `basic-list/${listId}/listItems/${document.id}`);
        await setDoc(path, document).then(() => {
            console.log('document updated.')
        });
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

    public async updateItemListItem(listId: string, docId: string, document: ItemListItem): Promise<void> {
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

    public async addCollection(document: BasicList): Promise<void> {
        const userUid = this.authService.user?.uid;
        if (!userUid) {
            throw new Error('Invalid User-UID.');
        }
        const path = `basic-list`;
        const collection1 = collection(this.firestore, path);
        await addDoc(collection1, document).then(ref => {
            console.log("Document written with ID: ", ref.id);
            const userList: UserList = {
                listUid: ref.id,
                role: UserListRole.Owner,
                userUid: userUid
            }
            this.userListService.add(userList);
        });
    }

    public async updateCollection(document: BasicList): Promise<void> {
        const path = doc(this.firestore, `basic-list/${document.id}`);
        await setDoc(path, document).then(() => {
            console.log('document updated.')
        });
    }

  public async deleteCollection(document: BasicList): Promise<void> {
    const path = doc(this.firestore, `basic-list/${document.id}`);
    await deleteDoc(path).then(() => {
      console.log('document deleted.')
    });
  }
}
