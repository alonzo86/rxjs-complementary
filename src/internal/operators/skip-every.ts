import {Observable, Operator, OperatorFunction, Subscriber} from 'rxjs';

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Subscriber}
 */
class SkipEverySubscriber<T> extends Subscriber<T> {
  private skips: number;

  constructor(destination: Subscriber<T>, private gap: number) {
    super(destination);
    this.skips = 0;
  }

  protected _next(value: T): void {
    if (this.skips === this.gap) {
      this.destination.next!(value);
      this.skips = 0;
      return;
    }
    this.skips++;
  }
}

class SkipEveryOperator<T> implements Operator<T, T> {
  constructor(private gap: number) {
  }

  call(observer: Subscriber<T>, source: any): any {
    return source.subscribe(new SkipEverySubscriber(observer, this.gap));
  }
}

/**
 * Ignores every X emissions, emitting only those between gaps.
 *
 * <span class="informal">If an emission should be skipped it's ignored otherwise emitted.</span>
 *
 * ## Example
 * A simple example emitting every 2 elements
 * ```ts
 * import { of } from 'rxjs';
 * import { skipEvery } from 'rxjs-complementary/operators';
 *
 *  of(1, 2, 3, 4, 5, 6, 7, 8, 9).pipe(
 *     skipEvery(2),
 * )
 * .subscribe(x => console.log(x)); // -> 3, 6, 9
 * ```
 *
 * @param {number} gap A number stating number of emissions to skip.
 * @return {Observable} An Observable of relevant emission after skips.
 * @name skipEvery
 */
export function skipEvery<T>(gap: number): OperatorFunction<T, T> {
  return (source: Observable<T>) => source.lift(new SkipEveryOperator(gap));
}
