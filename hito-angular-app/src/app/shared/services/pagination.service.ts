import { map, scan, tap, take } from 'rxjs/operators';
import { Injectable, Query } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { firebaseCollectionsConstants } from '../constants';

interface QueryConfig {
  path: string;
  field: string;
  limit?: number;
  reverse?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private _done = new BehaviorSubject(false);
  private _loading = new BehaviorSubject(false);
  private _data = new BehaviorSubject([]);

  private query: QueryConfig;

  data: Observable<any>;
  done: Observable<boolean> = this._done.asObservable();
  loading: Observable<boolean> = this._done.asObservable();



  constructor(private angularFirestore: AngularFirestore) { }

  init(path, field, opts?) {
    this.query = {
      path,
      field,
      limit: 12,
      reverse: false,
      ...opts
    };
    const initialData = this.angularFirestore.collection(this.query.path, ref =>
      ref.orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc').limit(this.query.limit));

    this.mapAndUpdate(initialData);

    this.data = this._data.asObservable()
      .pipe(scan((acc, val) => acc.concat(val)));
  }

  private mapAndUpdate(col: AngularFirestoreCollection<any>) {

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



  private getCursor() {
    const current = this._data.value;
    if (current.length) {
      return current[current.length - 1].doc;
    }
    return null;
  }

  more() {
    const cursor = this.getCursor();
    const more = this.angularFirestore.collection(this.query.path, ref =>
      ref.orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc').limit(this.query.limit).startAfter(cursor));
    this.mapAndUpdate(more);
  }
}
