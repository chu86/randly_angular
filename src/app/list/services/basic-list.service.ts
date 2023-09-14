import { Injectable } from '@angular/core';
import { BasicList } from "../models/basic-list.model";
import { firstValueFrom, from, map, Observable, switchMap } from "rxjs";
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
import { AuthService } from "../../auth/services/auth.service";
import { ItemListItem } from "../../item/models/item-list-item.model";
import { UserListService } from "./user-list.service";
import { UserList } from "../models/user-list.model";
import { UserListRole } from "../models/user-list-role-enum.model";

@Injectable({
    providedIn: 'root'
})
export class BasicListService {

    constructor(public firestore: Firestore,
        public authService: AuthService,
        public userListService: UserListService) {
    }

    public getUserCollections(listIds: string[]): Observable<BasicList[]> {
        if (!listIds || listIds.length === 0){
            return from([]);
        }
        const collection1 = collection(this.firestore, 'basic-list');
        const whereCondition = where(documentId(), "in", listIds);
        const queryVar = query(collection1, whereCondition);
        return collectionData(queryVar, { idField: 'id' }) as Observable<BasicList[]>;
    }

    public getCollectionDocument(id: string): Observable<BasicList> {
        const path = doc(this.firestore, `basic-list/${id}`);
        return from(getDoc(path)).pipe(map(docSnap => ({ id, ...docSnap.data() } as BasicList)))
    }

    public getListItems(id: string): Observable<BasicList[]> {
        const collection1 = collection(this.firestore, `basic-list/${id}/listItems`);
        return collectionData(collection1, { idField: 'id' }) as Observable<BasicList[]>;
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
        return collectionData(collection1, { idField: 'id' }) as Observable<ItemListItem[]>;
    }

    public async addItem(listId: string, docId: string, document: ItemListItem): Promise<void> {
        const path = `basic-list/${listId}/listItems/${docId}/itemlist`;
        const collection1 = collection(this.firestore, path);
        const docRef = await addDoc(collection1, document);
        console.log("Collection added with ID: ", docRef.id);
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

    public async addListItem(listId: string, document: BasicList): Promise<void> {
        const path = `basic-list/${listId}/listItems`;
        const collection1 = collection(this.firestore, path);
        const docRef = await addDoc(collection1, document);
        console.log("Document written with ID: ", docRef.id);
    }

    public async deleteListItem(listId: string, document: BasicList): Promise<void> {
        const path = doc(this.firestore, `basic-list/${listId}/listItems/${document.id}`);
        await deleteDoc(path).then(() => {
            console.log('document deleted.')
        });
    }

    public async updateListItem(listId: string, document: BasicList): Promise<void> {
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
        if (!document.id) {
            throw new Error('Invalid Document-UID.');
        }
       
        await this.userListService.getByListUid(document.id).then(test=> {
            if (test.length !== 1) {
                throw new Error('Invalid User-List assignment.')
            }
            const userList = test[0];
            const isOwner = userList.role === UserListRole.Owner;
            this.userListService.delete(userList).then(()=>{
                console.log('UserList deleted.');
                if (isOwner) {
                    const path = doc(this.firestore, `basic-list/${document.id}`);
                    return from(deleteDoc(path).then(() => {
                        console.log('Collection deleted.');
                    }));
                }
                return from([]);
            })
        });
    }

    public getMaxOrder(listItems: BasicList[] | null | undefined): number {
        if (!listItems) {
            return 0;
        }
        return Math.max(...listItems.map(o => o.order ?? 1), 1)
    }
}
