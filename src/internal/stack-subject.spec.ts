import {getTestScheduler} from 'jasmine-marbles';
import {StackSubject} from './stack-subject';

describe('stack subject', () => {

    beforeEach(() => {
        getTestScheduler().flush();
    });

    afterEach(() => {
        getTestScheduler().flush();
    });

    it('should act like a subject', () => {
        const source = new StackSubject(1);
        getTestScheduler().expectObservable(source).toBe('a', {a: 1});
    });

    it('should emit next', () => {
        const source = new StackSubject(1);
        source.next(2);
        getTestScheduler().expectObservable(source).toBe('a', {a: 2});
    });

    it('should get stack top', () => {
        const source = new StackSubject(1);
        source.next(2);
        source.next(3);
        source.pop();
        expect(source.getValue()).toBe(2);
    });

    it('should emit stack previous 1', () => {
        const source = new StackSubject(1);
        source.next(2);
        source.next(3);
        source.pop();
        getTestScheduler().expectObservable(source).toBe('a', {a: 2});
    });

    it('should emit previous 2', () => {
        const source = new StackSubject(1);
        source.next(2);
        source.next(3);
        source.pop(2);
        getTestScheduler().expectObservable(source).toBe('a', {a: 1});
    });
});
