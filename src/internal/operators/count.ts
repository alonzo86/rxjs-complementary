import {Observable, Operator, OperatorFunction, Subscriber} from 'rxjs';

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Subscriber}
 */
class CountSubscriber<T> extends Subscriber<T> {
  private count: number;

  constructor(destination: Subscriber<number>) {
    super(destination);
    this.count = 0;
  }

  protected _next(value: T): void {
    this.count++;
  }

  protected _complete(): void {
    this.destination.next!(this.count);
    this.destination.complete!();
  }
}

class CountOperator<T> implements Operator<T, number> {
  call(observer: Subscriber<number>, source: any): any {
    return source.subscribe(new CountSubscriber(observer));
  }
}

/**
 * Returns the number of emissions until source completes.
 *
 * <span class="informal">Number of emissions until source completes.</span>
 *
 * ## Example
 * A simple example emitting 5 after 5 emissions
 * ```ts
 * import { of } from 'rxjs';
 * import { count } from 'rxjs-complementary/operators';
 *
 *  of(1, 2, 3, 4, 5).pipe(
 *     count(),
 * )
 * .subscribe(x => console.log(x)); // -> 5
 * ```
 *
 * @return {Observable} An Observable of the number of total source emissions.
 * @name count
 */
export function count<T>(): OperatorFunction<T, number> {
  return (source: Observable<T>) => source.lift(new CountOperator());
}
