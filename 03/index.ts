import _ from 'lodash';
import {read} from '../helpers';

type Input = Array<Array<string>>;

type Output1 = {
    gamma: string,
    epsilon: string,
};

export function parse(name: string): Input {
    const contents = read(name);
    return contents.split('\n').map(item => item.split(''));
}

type Count = [string, number];

export function calculate1(inputs: Input): Output1 {
    const transposed = _.zip(...inputs);
    let g = '';
    let e = '';
    for (const item of transposed) {
        const stats: Count[] = _.flow([
            _.countBy,
            _.entries,
            (item) => _.sortBy(item, _.last)
        ])(item);
        g += (_.last(stats) as Count)[0];
        e += (_.head(stats) as Count)[0];
    }
    return { gamma: g, epsilon: e };
}

type Output2 = {
    oxygen: string,
    co2: string,
}

function scan(input: Input, basis: string, position: number = 0): Input {
    const matches = input.filter(item => item[position] === basis[position]);
    if (matches.length <= 1) return matches;
    return scan(matches, basis, position + 1);
}

export function calculate2(input: Input): Output2 {
    const basis = calculate1(input);
    scan(input, basis.gamma);
    return { oxygen: '', co2: '' };
}
