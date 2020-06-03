import {getTestScheduler, hot} from 'jasmine-marbles';
import {mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {sswitch} from './sswitch';

describe('sswitch', () => {

    beforeEach(() => {
        getTestScheduler().flush();
    });

    it('should switch to correct case', () => {
        const source = hot('--a|', {a: 2});
        const x$ = of('x$');
        const y$ = of('y$');
        const z$ = of('z$');
        const w$ = of('w$');
        const callSome = source.pipe(mergeMap(val => sswitch(val, {1: x$, 2: y$, 3: z$}, w$)));
        getTestScheduler().expectObservable(callSome).toBe('--y|)', {y: 'y$'});
    });

    it('fall back to default case', () => {
        const source = hot('--a|', {a: 500});
        const x$ = of('x$');
        const y$ = of('y$');
        const z$ = of('z$');
        const w$ = of('w$');
        const callSome = source.pipe(mergeMap(val => sswitch(val, {1: x$, 2: y$, 3: z$}, w$)));
        getTestScheduler().expectObservable(callSome).toBe('--w|)', {w: 'w$'});
    });
});
