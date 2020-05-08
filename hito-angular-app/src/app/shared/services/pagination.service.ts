import { UserService } from './user.service';
import { PaginationQuery } from './../models/pagination-query.model';
import { scan, tap, take, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private _done = new BehaviorSubject(false);
  private _data = new BehaviorSubject([]);

  private query: PaginationQuery;

  data: Observable<any>;
  done: Observable<boolean> = this._done.asObservable();

  constructor(private angularFirestore: AngularFirestore, private userService: UserService) { }

  initHistoryData(paginationQuery: PaginationQuery): Observable<any> {
    this._data.next([]);
    this.query = paginationQuery;
    const initialData = this.angularFirestore.collection(this.query.path, ref =>
      ref.orderBy(this.query.field).limit(12));

    this.updateData(initialData);

    return this.data = this._data.asObservable()
      .pipe(scan((acc, val) => acc.concat(val)));
  }

  initLocalChatData(paginationQuery: PaginationQuery): Observable<any> {
    this._data.next([]);
    this.query = paginationQuery;
    //const cursor = this.getRandomCursor();
    const initialData = this.angularFirestore.collection(this.query.path, ref =>
      ref.limit(5));

    this.updateData(initialData);

    return this.data = this._data.asObservable()
      .pipe(scan((acc, val) => acc.concat(val)));
  }

  private updateData(col: AngularFirestoreCollection<any>) {
    if (!this._done.value) {
      return col.snapshotChanges().pipe(
        tap(arr => {
          const values = arr.map(snap => {
            const data = snap.payload.doc.data();
            const doc = snap.payload.doc;
            return { ...data, doc };
          });

          this._data.next(values);

          if (!values.length) {
            this._done.next(true);
          }
        })
      ).pipe(take(1)).subscribe();
    }
  }

  private getRandomCursor() {
    const current = this._data.value;
    const randomNumber =  Math.floor(Math.random() * (current.length - 1 + 1) + 1);
    if (current.length) {
      return current[current.length - randomNumber].doc;
    }
    return null;
  }

  private getCursor() {
    const current = this._data.value;
    if (current.length) {
      return current[current.length - 1].doc;
    }
    return null;
  }

  loadNextPage() {
    const cursor = this.getCursor();
    const nextPageData = this.angularFirestore.collection(this.query.path, ref =>
      ref.orderBy(this.query.field).limit(this.query.limit) );
    this.updateData(nextPageData);
  }

  getData() {
    return this.data;
  }
}
