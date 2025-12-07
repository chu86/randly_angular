import { Injectable } from '@angular/core';
import { BasicList } from "../models/basic-list.model";
import { from, map, Observable, firstValueFrom } from "rxjs";
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
    where, writeBatch
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
        if (!listIds || listIds.length === 0) {
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

    public getListItems(id: string | null | undefined): Observable<BasicList[]> {
        if (!id) {
            return from([]);
        }
        const collection1 = collection(this.firestore, `basic-list/${id}/listItems`);
        return collectionData(collection1, { idField: 'id' }) as Observable<BasicList[]>;
    }

    public getItemDocument(listId: string, docId: string): Observable<BasicList> {
        const path = doc(this.firestore, `basic-list/${listId}/listItems/${docId}`);
        const parentPath = doc(this.firestore, `basic-list/${listId}`);
        return from(getDoc(parentPath).then(parent=>{
            const parentData = {...parent.data(), id: listId} as BasicList;
            return getDoc(path).then(result=>{
                return { ...result.data() as BasicList, id: docId, parent: parentData } as BasicList
            })
        }));
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

    public async updateItemListItemBatch(listId: string, docId: string, documents: ItemListItem[]): Promise<void> {
        const batchWrite = writeBatch(this.firestore);
        documents.forEach(document => {
            const path = doc(this.firestore, `basic-list/${listId}/listItems/${docId}/itemlist/${document.id}`);
            batchWrite.set(path, document);
        });
        await batchWrite.commit().then(() => {
            console.log('item updated.')
        });
    }

    public async copyItemToCollection(sourceListId: string, sourceItemId: string, targetListId: string): Promise<void> {
        // load source item data
        const sourceItemPath = doc(this.firestore, `basic-list/${sourceListId}/listItems/${sourceItemId}`);
        const sourceItemSnap = await getDoc(sourceItemPath);
        const sourceItemData = sourceItemSnap.data() as BasicList | undefined;

        if (!sourceItemData) {
            throw new Error('Source item not found');
        }

        // create new item document in target list (without reusing id)
        const targetItemsCollection = collection(this.firestore, `basic-list/${targetListId}/listItems`);
        const { id: _ignoreId, parent: _ignoreParent, ...cleanData } = sourceItemData as any;
        const newItemRef = await addDoc(targetItemsCollection, cleanData);

        // copy nested itemlist entries (take a single snapshot of the current entries)
        const itemListEntries = await firstValueFrom(this.getItemList(sourceListId, sourceItemId));
        if (itemListEntries && itemListEntries.length > 0) {
            for (const entry of itemListEntries) {
                const { id: _oldId, ...cleanEntry } = entry as any;
                await this.addItem(targetListId, newItemRef.id, cleanEntry as ItemListItem);
            }
        }
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

    public async updateCollectionBatch(documents: BasicList[]): Promise<void> {
        const batchWrite = writeBatch(this.firestore);
        documents.forEach(document => {
            const path = doc(this.firestore, `basic-list/${document.id}`);
            batchWrite.set(path, document);
        });
        await batchWrite.commit().then(() => {
            console.log('document updated.')
        });
    }

    public async updateCollectionItemBatch(listId: string, documents: BasicList[]): Promise<void> {
        const batchWrite = writeBatch(this.firestore);
        documents.forEach(document => {
            const path = doc(this.firestore, `basic-list/${listId}/listItems/${document.id}`);
            batchWrite.set(path, document);
        });
        await batchWrite.commit().then(() => {
            console.log('document updated.')
        });
    }

    public async deleteCollection(document: BasicList): Promise<void> {
        if (!document.id) {
            throw new Error('Invalid Document-UID.');
        }

        await this.userListService.getByListUid(document.id).then(test => {
            if (test.length !== 1) {
                throw new Error('Invalid User-List assignment.')
            }
            const userList = test[0];
            const isOwner = userList.role === UserListRole.Owner;
            this.userListService.delete(userList).then(() => {
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

    public getMaxOrder(listItems: ItemListItem[] | null | undefined): number {
        if (!listItems || listItems.length === 0) {
            return 0;
        }
        return Math.max(...listItems.map(o => o.order ?? 1), 1)
    }

    public filterSortListItems(value: BasicList[] | null | undefined, filter: string | null | undefined): BasicList[] {
        if (!value) {
            return [];
        }
        let filteredValue = value;
        if (filter) {
            filteredValue = value.filter(item => {
                const lcFilter = filter!.toLocaleLowerCase();
                return item.name.toLowerCase().includes(lcFilter) || item.tags?.map(t => t.toLowerCase()).includes(lcFilter);
            })
        }
        return this.sortAlphabetical(filteredValue);
    }

    private sortAlphabetical(value: BasicList[] | null | undefined): BasicList[] {
        if (!value){
            return [];
        }
        return value?.sort(({ name: a }, { name: b }) => a.localeCompare(b))
    }
}

