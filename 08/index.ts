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
    0: 6,
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

export function count(input: Input): number {
    const counts = _.flow([
        (item) => _.map(item, _.last),
        _.flatten,
        (item) => _.map(item, _.size),
        _.countBy,
    ])(input);
    return counts[segments[1]] + counts[segments[4]] + counts[segments[7]] + counts[segments[8]];
}

type Schema = Record<number, string>;

function length(input: string[], target: number): string {
    return input.find(item => item.length === target)!
}

function intersects(subject: string, target: string) {
    return target.split('').every(char => {
        return subject.includes(char);
    });
}

function text(input: string[], target: string): string[] {
    return input.filter(subject => {
        return intersects(subject, target);
    });
}

function unused(input: string[], schema: Schema): string[] {
    return input.filter(item => !Object.values(schema).includes(item))
}

export function decode(parts: string[][]): number {
    const [input] = parts;
    const groups = _.groupBy(input, (item) => item.length);

    const schema: Schema = {};
    schema[1] = length(input, segments[1]);
    schema[4] = length(input, segments[4]);
    schema[7] = length(input, segments[7]);
    schema[8] = length(input, segments[8]);

    schema[3] = text(groups[5], schema[7])[0];
    schema[9] = text(groups[6], schema[3])[0];

    schema[0] = text(unused(input, schema), schema[7])[0];
    schema[6] = unused(groups[6], schema)[0];

    // schema[2] = undefined;
    // schema[5] = undefined;

    // schema[0] = undefined;
    // schema[6] = undefined;

    return 0;
}
