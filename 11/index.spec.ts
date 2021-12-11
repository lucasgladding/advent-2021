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

    it('finds part 2 example', () => {
        const input = parse('11/example.txt');
        const output = input.find();
        expect(output).toEqual(195);
    });

    it('finds part 2', () => {
        const input = parse('11/input.txt');
        const output = input.find();
        expect(output).toEqual(400);
    });
});
