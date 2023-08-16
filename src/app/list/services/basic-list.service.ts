import {Injectable} from '@angular/core';
import {BasicList} from "../models/basic-list.model";
import {from, map, Observable} from "rxjs";
import {collection, collectionData, doc, Firestore, getDoc, query, where} from '@angular/fire/firestore';
import {AuthService} from "../../auth/services/auth.service";
import {ListItem} from "../models/list-item.model";

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
        // const listUsers = collectionGroup(this.firestore, 'listUsers');
        const whereTest = where('users', "array-contains", this.authService.user?.uid);
        const queryTest = query(collection1, whereTest);
        return collectionData(queryTest, {idField: 'id'}) as Observable<BasicList[]>;
    }

    public getCollectionDocument(id: string): Observable<BasicList> {
        const path = doc(this.firestore, `basic-list/${id}`);
        return from(getDoc(path)).pipe(map(docSnap =>
            docSnap.data() as BasicList))
    }

    public getListItems(id: string): Observable<ListItem[]> {
        const collection1 = collection(this.firestore, `basic-list/${id}/listItems`);
        return collectionData(collection1, {idField: 'id'}) as Observable<ListItem[]>;
    }

}
