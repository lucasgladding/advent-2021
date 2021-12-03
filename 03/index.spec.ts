import {calculate1, calculate2, parse} from './index';

describe('03', () => {
    it('calculates part 1 example', () => {
        const input = parse('03/example.txt')
        const output = calculate1(input);
        expect(parseInt(output.gamma, 2) * parseInt(output.epsilon, 2)).toEqual(198);
    });

    xit('calculates part 1', () => {
        const input = parse('03/input.txt')
        const output = calculate1(input);
        expect(parseInt(output.gamma, 2) * parseInt(output.epsilon, 2)).toEqual(3687446);
    });

    xit('calculates part 2 example', () => {
        // const output = calculate2('03/example.txt');
    });
});
