import {evaluate, parse} from './index';

describe('18', () => {
    it.each([
        ['[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]', '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]'],
    ])('reduces the examples', (text, expected) => {
        const input = parse(text);
        const output = evaluate(input);
        expect(output.join('')).toEqual(expected);
    });
});