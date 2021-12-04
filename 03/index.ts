import _ from 'lodash';
import {read} from '../helpers';

type Input = string[][];

export function parse(name: string): Input {
    const contents = read(name);
    return contents.split('\n').map(item => item.split(''));
}

type Select = <T>(input: Array<T> | undefined) => T | undefined;

type Count = [string, number];

export function calculate1(inputs: Input, select: Select): string {
    let output = '';
    const transposed = _.zip(...inputs);
    for (const item of transposed) {
        const stats: Count[] = _.flow([
            _.countBy,
            _.entries,
            (item) => _.sortBy(item, _.last),
        ])(item);
        output += select(stats)![0];
    }
    return output;
}

export function calculate2(input: Input, select: Select): string {
    let current = input;
    const length = input[0].length;
    for (let i = 0; i < length; i++) {
        const numbers = current.map(item => item[i]);
        const target = _.flow([
            _.countBy,
            _.entries,
            (item) => _.sortBy(item, _.last),
            select,
            _.head,
        ])(numbers);
        current = current.filter(item => item[i] === target);
    }
    return current[0].join('');
}
