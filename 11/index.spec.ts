import {parse} from './index';

describe('11', () => {
    it('runs part 1 example', () => {
        const input = parse('11/example.txt');
        const output = input.iterate(100);
        expect(output).toEqual(1656);
    });

    it('runs part 1', () => {
        const input = parse('11/input.txt');
        const output = input.iterate(100);
        expect(output).toEqual(1735);
    });
});
