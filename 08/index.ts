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

type Schema = Record<string, string>;

type Evaluation = (subject: string) => boolean;

function included_in(target: string): Evaluation {
    return (subject) => {
        return subject.split('').every(char => target.includes(char));
    };
}

function includes(target: string): Evaluation {
    return (subject) => {
        return target.split('').every(char => subject.includes(char));
    };
}

function length(target: number): Evaluation {
    return (subject) => {
        return target === subject.length;
    };
}

function text(input: string[], evaluate: Evaluation): string[] {
    return input.filter(evaluate);
}

function unused(input: string[], schema: Schema): string[] {
    return input.filter(item => !Object.values(schema).includes(item))
}

function clean(input: string): string {
    return input.split('').sort().join('');
}

function deduce(input: string[]): Schema {
    const groups = _.groupBy(input, (item) => item.length);

    const schema: Schema = {};
    schema[1] = text(input, length(segments[1]))[0];
    schema[4] = text(input, length(segments[4]))[0];
    schema[7] = text(input, length(segments[7]))[0];
    schema[8] = text(input, length(segments[8]))[0];

    schema[3] = text(groups[5], includes(schema[7]))[0];
    schema[9] = text(groups[6], includes(schema[3]))[0];

    schema[0] = text(unused(input, schema), includes(schema[7]))[0];
    schema[5] = text(unused(groups[5], schema), included_in(schema[9]))[0];

    schema[2] = unused(groups[5], schema)[0];
    schema[6] = unused(groups[6], schema)[0];

    return Object.entries(schema).reduce((acc, item) => {
        acc[item[0]] = clean(item[1]);
        return acc;
    }, {} as Schema);
}

export function decode(parts: string[][]): number {
    const [input, output] = parts;

    const schema = deduce(input);

    const text = output.map(clean).map(item => {
        const pairs = Object.entries(schema);
        const match = pairs.find(pair => pair[1] === item);
        return match![0];
    }).join('');

    return parseInt(text);
}
