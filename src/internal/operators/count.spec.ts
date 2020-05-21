import {getTestScheduler, hot} from 'jasmine-marbles';
import {count} from './count';

describe('count operator', () => {

    beforeEach(() => {
        getTestScheduler().flush();
    });

    it('should count the total number of emissions', () => {
        const source = hot('--a--b--c--d--e|', {a: 2, b: 6, c: 9, d: 1, e: -12});
        const callSome = source.pipe(count());
        getTestScheduler().expectObservable(callSome).toBe('---------------(s|)', {s: 5});
    });
});
