import _ from 'lodash';
import {read} from '../helpers';

type Input = string[][][];

export function parse(name: string): Input {
    const contents = read(name);
    return contents.split('\n').map(item => {
        return item.split(' | ').map(item => item.split(' '));
    })
}

const segments = {
    1: 2,
    2: 5,
    3: 5,
    4: 4,
    5: 5,
    6: 6,
    7: 3,
    8: 7,
    9: 6,
};

export function count1(input: Input): number {
    const counts = _.flow([
        (item) => _.map(item, _.last),
        _.flatten,
        (item) => _.map(item, _.size),
        _.countBy,
    ])(input);
    return counts[segments[1]] + counts[segments[4]] + counts[segments[7]] + counts[segments[8]];
}
