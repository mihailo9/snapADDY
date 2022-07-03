/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */

import { ILoading } from '@core/models/ILoading';
import { FromInjector } from '@core/util/from-injector';

import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export abstract class Store<T extends ILoading> {
  protected _state: T = null;

  protected readonly store: BehaviorSubject<T> = new BehaviorSubject<T>(
    this._state
  );

  protected readonly state$: Observable<T> = this.store.asObservable();

  vm$: Observable<T>;

  constructor(protected readonly fromInjector: FromInjector) {}

  protected updateState(state: T): void {
    this.store.next((this._state = state));
  }

  protected updateStateProp(prop: string, payload: any): void {
    this.store.next((this._state = { ...this._state, [prop]: payload }));
  }

  protected selectPropFromState(prop: string): Observable<any> {
    return this.state$.pipe(
      map(
        (state) => (state ? state[prop] : null),

        distinctUntilChanged()
      )
    );
  }

  protected setupVM(projector, ...props): Observable<any> {
    return combineLatest(...props, projector);
  }

  protected abstract initVM(): Observable<T>;
}
