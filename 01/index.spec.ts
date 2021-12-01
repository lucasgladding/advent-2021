import {calculate1, calculate2} from './index';

describe('01', () => {
    it('calculates the part 1 example', () => {
        const output = calculate1('01/example.txt');
        expect(output).toEqual(7);
    });

    it('calculates part 1', () => {
        const output = calculate1('01/input.txt');
        expect(output).toEqual(1121);
    });

    it('calculates the part 2 example', () => {
        const output = calculate2('01/example.txt');
        expect(output).toEqual(5);
    });

    it('calculates part 2', () => {
        const output = calculate2('01/input.txt');
        expect(output).toEqual(1065);
    });
});
