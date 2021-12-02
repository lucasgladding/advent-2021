import {navigate1} from './index';

describe('02', () => {
    it('navigates part 1 example', () => {
        const output = navigate1('02/example.txt');
        expect(output).toEqual({ position: 15, depth: 10 });
    });

    it('navigates part 1', () => {
        const output = navigate1('02/input.txt');
        expect(output).toEqual({ position: 1850, depth: 927 });
    });
});
