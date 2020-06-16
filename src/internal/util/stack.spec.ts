import {Stack} from './stack';
import {StackIsEmptyError} from './stack-is-empty-error';

describe('stack', () => {

    let unlimitedStack: Stack<number>;
    let limitedStack: Stack<number>;

    beforeEach(() => {
        unlimitedStack = new Stack();
        limitedStack = new Stack(6);
        limitedStack.push(1);
        limitedStack.push(2);
        limitedStack.push(3);
        limitedStack.push(4);
        limitedStack.push(5);
    });

    it('unlimited stack capacity should be null', () => {
        expect(unlimitedStack.capacity).toBe(null);
    });

    it('limited stack capacity should be defined', () => {
        expect(limitedStack.capacity).toBe(6);
    });

    it('peek empty stack', () => {
        limitedStack.pop();
        limitedStack.pop();
        limitedStack.pop();
        limitedStack.pop();
        limitedStack.pop();
        expect(function() { limitedStack.peek() }).toThrow(new StackIsEmptyError());
    });

    it('pop empty stack', () => {
        limitedStack.pop();
        limitedStack.pop();
        limitedStack.pop();
        limitedStack.pop();
        limitedStack.pop();
        expect(function() { limitedStack.pop() }).toThrow(new StackIsEmptyError());
    });

    it('peek stack', () => {
        expect(limitedStack.peek()).toBe(5);
    });

    it('push to stack', () => {
        limitedStack.push(11);
        expect(limitedStack.peek()).toBe(11);
    });

    it('push to stack over capacity', () => {
        limitedStack.push(11);
        limitedStack.push(12);
        expect(limitedStack.peek()).toBe(12);
        expect(limitedStack.capacity).toBe(6);
    });

    it('pop from stack', () => {
        expect(limitedStack.pop()).toBe(5);
        expect(limitedStack.peek()).toBe(4);
    });

    it('pop from stack and check size', () => {
        limitedStack.pop();
        expect(limitedStack.size).toBe(4);
    });
});
