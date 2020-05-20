import {Observable, Operator, OperatorFunction, Subscriber} from 'rxjs';

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Subscriber}
 */
class SomeSubscriber<T> extends Subscriber<T> {
  private index: number;

  constructor(destination: Subscriber<boolean>,
              private predicate: (value: T, index: number, source: Observable<T>) => boolean,
              private readonly thisArg: any,
              private source: Observable<T>) {
    super(destination);
    this.thisArg = thisArg || this;
    this.index = 0;
  }

  private notifyComplete(someValueMatch: boolean): void {
    this.destination.next!(someValueMatch);
    this.destination.complete!();
  }

  protected _next(value: T): void {
    let result = false;
    try {
      result = this.predicate.call(this.thisArg, value, this.index++, this.source);
    } catch (err) {
      this.destination.error!(err);
      return;
    }

    if (result) {
      this.notifyComplete(true);
    }
  }

  protected _complete(): void {
    this.notifyComplete(false);
  }
}

class SomeOperator<T> implements Operator<T, boolean> {
  constructor(private predicate: (value: T, index: number, source: Observable<T>) => boolean,
              private thisArg: any,
              private source: Observable<T>) {
  }

  call(observer: Subscriber<boolean>, source: any): any {
    return source.subscribe(new SomeSubscriber(observer, this.predicate, this.thisArg, this.source));
  }
}

/**
 * Returns an Observable that emits whether or not there is an item of the source satisfies the condition specified.
 *
 * <span class="informal">If a single value pass predicate before the source completes, emits true before completion,
 * otherwise emit false, then complete.</span>
 *
 * ## Example
 * A simple example emitting true if single element is less than 5, false otherwise
 * ```ts
 * import { of } from 'rxjs';
 * import { some } from 'rxjs/operators';
 *
 *  of(20, 10, 8, 2, 1000, 1).pipe(
 *     some(x => x < 5),
 * )
 * .subscribe(x => console.log(x)); // -> true
 * ```
 *
 * @param {function} predicate A function for determining if an item meets a specified condition.
 * @param {any} [thisArg] Optional object to use for `this` in the callback.
 * @return {Observable} An Observable of booleans that determines if a single item of the source Observable meet the condition specified.
 * @name some
 */
export function some<T>(predicate: (value: T, index: number, source: Observable<T>) => boolean,
                         thisArg?: any): OperatorFunction<T, boolean> {
  return (source: Observable<T>) => source.lift(new SomeOperator(predicate, thisArg, source));
}
