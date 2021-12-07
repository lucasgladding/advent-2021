import {parse, run1, run2} from './index';

describe('07', () => {
    it('runs part 1 example', () => {
        const input = parse('07/example.txt');
        const target = run1(input);
        expect(target).toEqual(37);
    });

    it('runs part 1', () => {
        const input = parse('07/input.txt');
        const target = run1(input);
        expect(target).toEqual(336701);
    });

    it('runs part 2 example', () => {
        const input = parse('07/example.txt');
        const target = run2(input);
        expect(target).toEqual(168);
    });

    it('runs part 2', () => {
        const input = parse('07/input.txt');
        const target = run2(input);
        expect(target).toEqual(95167302);
    });
});
