import {parse, score1, score2} from './index';

describe('10', () => {
    it('score part 1 example', () => {
        const input = parse('10/example.txt');
        const output = score1(input);
        expect(output).toEqual(26397);
    });

    it('score part 1', () => {
        const input = parse('10/input.txt');
        const output = score1(input);
        expect(output).toEqual(392421);
    });

    it('scores part 2 example', () => {
        const input = parse('10/example.txt');
        const output = score2(input);
        expect(output).toEqual(288957);
    });

    it('scores part 2', () => {
        const input = parse('10/input.txt');
        const output = score2(input);
        expect(output).toEqual(2769449099);
    });
});
