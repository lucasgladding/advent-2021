import {count1, parse} from './index';

describe('08', () => {
    it('counts part 1 example', () => {
        const input = parse('08/example.txt');
        const output = count1(input);
        expect(output).toEqual(26);
    });

    it('counts part 1', () => {
        const input = parse('08/input.txt');
        const output = count1(input);
        expect(output).toEqual(512);
    });
});
