import {main} from './index';

describe('01', () => {
    it('runs', () => {
        const output = main();
        expect(output).toEqual(7);
    });
});
