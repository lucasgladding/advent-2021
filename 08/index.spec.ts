import {count, decode, parse} from './index';

describe('08', () => {
    it('counts part 1 example', () => {
        const input = parse('08/example.txt');
        const output = count(input);
        expect(output).toEqual(26);
    });

    it('counts part 1', () => {
        const input = parse('08/input.txt');
        const output = count(input);
        expect(output).toEqual(512);
    });

    it('decodes part 2 example', () => {
        const input = parse('08/example.txt');
        const output = decode(input[0]);
        expect(output).toEqual(5353);
    });
});
