import {navigate1, navigate2} from './index';

describe('02', () => {
    it('navigates part 1 example', () => {
        const output = navigate1('02/example.txt');
        expect(output).toEqual({ position: 15, depth: 10 });
    });

    it('navigates part 1', () => {
        const output = navigate1('02/input.txt');
        expect(output).toEqual({ position: 1850, depth: 927 });
        expect(output.position * output.depth).toEqual(1714950);
    });

    it('navigates part 2 example', () => {
        const output = navigate2('02/example.txt');
        expect(output).toEqual({ position: 15, depth: 60 });
    });

    it('navigates part 2', () => {
        const output = navigate2('02/input.txt');
        expect(output).toEqual({ position: 1850, depth: 692961 });
        expect(output.position * output.depth).toEqual(1281977850);
    });
});
