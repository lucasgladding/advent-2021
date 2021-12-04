import _ from 'lodash';
import {read} from '../helpers';

type Input = string[][];

export function parse(name: string): Input {
    const contents = read(name);
    return contents.split('\n').map(item => item.split(''));
}

type Select = <T>(input: T[] | undefined) => T | undefined;

function find(list: string[], select: Select) {
    return _.flow([
        _.countBy,
        _.entries,
        (item) => _.sortBy(item, _.last),
        select,
        _.head,
    ])(list);
}

export function calculate1(inputs: Input, select: Select): string {
    return _.zip(...inputs).map(item => {
        return find(item as string[], select);
    }).join('');
}

export function calculate2(input: Input, select: Select): string {
    let current = input;
    for (let i = 0; i < input[0].length; i++) {
        const target = find(current.map(item => item[i]), select);
        current = current.filter(item => item[i] === target);
    }
    return current[0].join('');
}
