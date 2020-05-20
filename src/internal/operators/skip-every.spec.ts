import {getTestScheduler, hot} from 'jasmine-marbles';
import {skipEvery} from './skip-every';

describe('skipEvery operator', () => {

    beforeEach(() => {
        getTestScheduler().flush();
    });

    it('should complete with false', () => {
        const source = hot('--a--b--c--d--e--f--g--h--i|', {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9});
        const callSome = source.pipe(skipEvery(2));
        getTestScheduler().expectObservable(callSome).toBe('--------s--------t--------u|', {s: 3, t:6, u:9});
    });
});
