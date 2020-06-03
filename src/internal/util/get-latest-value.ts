import {Observable} from 'rxjs';
import {take, tap} from 'rxjs/operators';

export function getLatestValue<T extends any>(observable: Observable<T>): T {
  let innerValue: T;
  observable.pipe(
      take(1),
      tap(val => innerValue = val)
  ).subscribe();
  return innerValue!;
}
