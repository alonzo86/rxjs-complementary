import {Observable, of} from 'rxjs';
import {getLatestValue} from './get-latest-value';

describe('get latest value', () => {

    const expectedValue = 'test_value';
    let observable: Observable<string>;

    beforeEach(() => {
        observable = of(expectedValue);
    });

    it('get observable value', () => {
        const value = getLatestValue(observable);
        expect(value).toBe(expectedValue);
    });
});
