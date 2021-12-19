import {checksum, get_uniques, parse, reduce, sum} from './index';
import {read} from '../helpers';

describe('18', () => {
    it.each([
        ['[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]', '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]'],
    ])('reduces the examples', (text, expected) => {
        const input = parse(text);
        const output = reduce(input);
        expect(output.join('')).toEqual(expected);
    });

    it.each([
        ['[[1,2],[[3,4],5]]', 143],
        ['[[[[0,7],4],[[7,8],[6,0]]],[8,1]]', 1384],
        ['[[[[1,1],[2,2]],[3,3]],[4,4]]', 445],
        ['[[[[3,0],[5,3]],[4,4]],[5,5]]', 791],
        ['[[[[5,0],[7,4]],[5,5]],[6,6]]', 1137],
        ['[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]', 3488],
    ])('gets the magnitude', (text, expected) => {
        const input = parse(text);
        const output = reduce(input);
        expect(checksum(output)).toEqual(expected);
    });

    it('gets the example 1', () => {
        const contents = read('18/example-1.txt').split('\n').map(item => parse(item));
        const output = sum(contents);
        expect(output.join('')).toEqual('[[[[6,6],[7,6]],[[7,7],[7,0]]],[[[7,7],[7,7]],[[7,8],[9,9]]]]');
        expect(checksum(output)).toEqual(4140)
    });

    it('gets part 1', () => {
        const contents = read('18/input.txt').split('\n').map(item => parse(item));
        const output = sum(contents);
        expect(checksum(output)).toEqual(4072)
    });

    it('gets the example 2', () => {
        const contents = read('18/example-1.txt').split('\n').map(item => parse(item));
        const inputs = get_uniques(contents);
        const sums = inputs.map(item => {
            const output = sum(item);
            return checksum(output);
        });
        const max = Math.max(...sums);
        expect(max).toEqual(3993)
    });

    it('gets part 2', () => {
        const contents = read('18/input.txt').split('\n').map(item => parse(item));
        const inputs = get_uniques(contents);
        const sums = inputs.map(item => {
            const output = sum(item);
            return checksum(output);
        });
        const max = Math.max(...sums);
        expect(max).toEqual(4483)
    });
});
