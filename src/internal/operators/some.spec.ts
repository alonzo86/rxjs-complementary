import {some} from './some';
import {getTestScheduler, hot} from 'jasmine-marbles';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';

describe('some operator', () => {

    beforeEach(() => {
        getTestScheduler().flush();
    });

    it('should complete with false', () => {
        const source = hot('--a--b--c--d--e--|', {a: 5, b: 10, c: 15, d: 18, e: 20});
        const callSome = source.pipe(some((val: number) => val < 4));
        getTestScheduler().expectObservable(callSome).toBe('-----------------(s|)', {s: false});
    });

    it('should complete with true', () => {
        const source = hot('--a--b--c--d--e--|', {a: 5, b: 10, c: 2, d: 18, e: 20});
        const callSome = source.pipe(some((val: number) => val < 4));
        getTestScheduler().expectObservable(callSome).toBe('--------(s|)', {s: true});
    });

    it('should throw predicate exception', () => {
        const source = hot('--a--b--c--d--e--|', {a: 5, b: 10, c: 2, d: 18, e: 20});
        const callSome = source.pipe(some(<any>null), catchError(() => of('error')));
        getTestScheduler().expectObservable(callSome).toBe('--(s|)', {s: 'error'});
    });
});
