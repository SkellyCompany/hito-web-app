import { PaginationQuery } from './../models/ui-models/pagination-query.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable, ɵConsole } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { tap, scan, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private _data = new BehaviorSubject([]);

  query: PaginationQuery;
  done: boolean;

  // Not used yet
  data: any[];

  constructor(private angularFirestore: AngularFirestore) { }

  initLocalChatData(paginationQuery: PaginationQuery): Observable<any> {
    this._data.next([]);
    this.data = [];
    this.query = paginationQuery;
    const initialData = this.angularFirestore.collection(this.query.path, ref => ref.orderBy(this.query.field).limit(12));
    this.updateData(initialData);
    return this._data.asObservable()
      .pipe(scan((acc, val) => acc.concat(val)));
  }

  private updateData(col: AngularFirestoreCollection<any>) {
    if (!this.done) {
      return col.snapshotChanges().pipe(
        tap(arr => {
          const values = arr.map(snap => {
            const data = snap.payload.doc.data();
            const doc = snap.payload.doc;
            return { ...data, doc };
          });

          this.data = values;
          this._data.next(values);

          if (!values.length) {
            this.done = true;
          }
        })
      ).pipe(take(2)).subscribe();
    }
  }

  private getLastPaginatedItem() {
    const current = this.data;
    if (current.length) {
      return current[current.length - 1].doc;
    }
    return null;
  }

  loadNextPage() {
    const cursor = this.getLastPaginatedItem();
    const nextPageData = this.angularFirestore.collection(this.query.path, ref =>
      ref.orderBy(this.query.field).limit(5).startAfter(cursor));
    this.updateData(nextPageData);
  }
}
