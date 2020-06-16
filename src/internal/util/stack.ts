import {StackIsEmptyError} from './stack-is-empty-error';

export class Stack<T> {

    private stack: T[] = [];

    constructor(private _capacity: number|null = null) {}

    public get capacity() {
        return this._capacity;
    }

    public get size() {
        return this.stack.length;
    }

    public push(value: T): void {
        if (this._capacity !== null && this.size === this.capacity) {
            this.stack.shift();
        }
        this.stack.push(value);
    }

    public pop(): T {
        if (this.size === 0) {
            throw new StackIsEmptyError();
        }
        return this.stack.pop()!;
    }

    public peek(): T {
        if (this.size === 0) {
            throw new StackIsEmptyError();
        }
        return this.stack[this.stack.length - 1];
    }
}
