import {Stack} from './stack';

describe('stack', () => {

    let stack: Stack<number>;

    beforeEach(() => {
        stack = new Stack();
        stack.push(1);
        stack.push(2);
        stack.push(3);
        stack.push(4);
        stack.push(5);
    });

    it('peek stack', () => {
        expect(stack.peek()).toBe(5);
    });

    it('push to stack', () => {
        stack.push(11);
        expect(stack.peek()).toBe(11);
    });

    it('pop from stack', () => {
        expect(stack.pop()).toBe(5);
        expect(stack.peek()).toBe(4);
    });

    it('pop from stack and check size', () => {
        stack.pop()
        expect(stack.size).toBe(4);
    });
});
