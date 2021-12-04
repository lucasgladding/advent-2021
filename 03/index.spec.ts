import _ from 'lodash';
import {calculate1, calculate2, parse} from './index';

describe('03', () => {
    it('calculates part 1 example', () => {
        const input = parse('03/example.txt')
        const g = calculate1(input, _.last);
        const e = calculate1(input, _.head);
        expect(parseInt(g, 2) * parseInt(e, 2)).toEqual(198);
    });

    it('calculates part 1', () => {
        const input = parse('03/input.txt')
        const g = calculate1(input, _.last);
        const e = calculate1(input, _.head);
        expect(parseInt(g, 2) * parseInt(e, 2)).toEqual(3687446);
    });

    it('calculates part 2 example', () => {
        const input = parse('03/example.txt')
        const o = calculate2(input, _.last);
        const c = calculate2(input, _.head);
        expect(parseInt(o, 2) * parseInt(c, 2)).toEqual(230);
    });

    it('calculates part 2', () => {
        const input = parse('03/input.txt')
        const o = calculate2(input, _.last);
        const c = calculate2(input, _.head);
        expect(parseInt(o, 2) * parseInt(c, 2)).toEqual(4406844);
    });
});
