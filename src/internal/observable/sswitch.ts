
import {defer, Observable, ObservableInput, ObservedValueOf} from 'rxjs';

/**
 * Decides at subscription time which Observable will actually be subscribed.
 *
 * <span class="informal">`Switch` statement for Observables.</span>
 *
 * `sswitch` accepts a value, map of cases of Observables and a default Observable. When
 * an Observable returned by the operator is subscribed, a map search will be performed.
 * Based on the accepted value, consumer will subscribe either to
 * the an Observable from the map (if a matching case found) or to the default Observable (if no case found in the map).
 *
 * ## Examples
 * ### Change at runtime which Observable will be subscribed
 * ```ts
 * import { sswitch, of } from 'rxjs-complementary';
 *
 * let subscribeToA;
 * const firstOrSecond = iif(
 *   () => subscribeToFirst,
 *   of('first'),
 *   of('second'),
 * );
 *
 * subscribeToFirst = true;
 * firstOrSecond.subscribe(value => console.log(value));
 *
 * // Logs:
 * // "first"
 *
 * subscribeToFirst = false;
 * firstOrSecond.subscribe(value => console.log(value));
 *
 * // Logs:
 * // "second"
 *
 * ```
 *
 * ### Control an access to an Observable
 * ```ts
 * let accessGranted;
 * const observableIfYouHaveAccess = iif(
 *   () => accessGranted,
 *   of('It seems you have an access...'), // Note that only one Observable is passed to the operator.
 * );
 *
 * accessGranted = true;
 * observableIfYouHaveAccess.subscribe(
 *   value => console.log(value),
 *   err => {},
 *   () => console.log('The end'),
 * );
 *
 * // Logs:
 * // "It seems you have an access..."
 * // "The end"
 *
 * accessGranted = false;
 * observableIfYouHaveAccess.subscribe(
 *   value => console.log(value),
 *   err => {},
 *   () => console.log('The end'),
 * );
 *
 * // Logs:
 * // "The end"
 * ```
 *
 * @see {@link defer}
 *
 * @param value case upon which Observable should be chosen.
 * @param cases A map of possible cases to subscribe to.
 * @param defaultCase default Observable that will be subscribed if no case matches.
 * @static true
 * @name sswitch
 * @owner Observable
*/
export function sswitch<O extends ObservableInput<any>, R>(value: any, cases: Cases<O, R>, defaultCase: Case<O, R>): Observable<R> {
  return defer(() => cases[value] || defaultCase);
}

interface Cases<O, R> {
    [caseValue: string]: Case<O, R>;
}

type Case<O, R> = O | ((value: ObservedValueOf<O>) => R);
