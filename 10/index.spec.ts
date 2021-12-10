import {parse, score} from './index';

describe('10', () => {
    it('score part 1 example', () => {
        const input = parse('10/example.txt');
        const output = score(input);
        expect(output).toEqual(26397);
    });

    it('score part 1', () => {
        const input = parse('10/input.txt');
        const output = score(input);
        expect(output).toEqual(392421);
    });
});
