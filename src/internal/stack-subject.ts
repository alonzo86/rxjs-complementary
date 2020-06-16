import {BehaviorSubject} from 'rxjs';
import {Stack} from './util/stack';

/**
 * A variant of BehaviorSubject that requires an initial value and/or capacity and manages a stack
 * of emissions which it can revert to and emit to its subscribers.
 *
 * @class BehaviorSubject<T>
 */
export class StackSubject<T> extends BehaviorSubject<T> {

    private readonly _stack: Stack<T>;

    constructor(value: T, capacity: number | null = null) {
        super(value);
        this._stack = new Stack<T>(capacity);
        this._stack.push(value);
    }

    getValue(): T {
        return this._stack.peek();
    }

    next(value: T): void {
        super.next(value);
        this._stack.push(value);
    }

    pop(count: number = 1): void {
        let value: T;
        try {
            do {
                value = this._stack.pop();
            } while (--count);
            super.next(value);
        } catch (e) {
            throw e;
        }
    }
}
