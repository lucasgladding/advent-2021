import _ from 'lodash';
import {read} from '../helpers';

type Input = string[][][];

function cleanup(input: string): string {
    return input.split('').sort().join('');
}

export function parse(name: string): Input {
    const contents = read(name);
    return contents.split('\n').map(item => {
        return item.split(' | ').map(item => item.split(' ').map(cleanup));
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

// PART 2

type Schema = Record<string, string>;

type EvaluationFn = (subject: string) => boolean;

function chars_in_target(text: string, target: string): boolean {
    return text.split('').every(char => target.includes(char));
}

function includes_chars(target: string): EvaluationFn {
    return subject => chars_in_target(target, subject);
}

function chars_in(target: string): EvaluationFn {
    return subject => chars_in_target(subject, target);
}

function intersect(input: string[], schema: Schema): string[] {
    return input.filter(item => !Object.values(schema).includes(item))
}

function get_schema(input: string[]): Schema {
    const groups = _.groupBy(input, item => item.length);

    const schema: Schema = {};

    schema[1] = groups[segments[1]][0];
    schema[4] = groups[segments[4]][0];
    schema[7] = groups[segments[7]][0];
    schema[8] = groups[segments[8]][0];

    schema[3] = groups[segments[3]].filter(includes_chars(schema[7]))[0];
    schema[9] = groups[segments[9]].filter(includes_chars(schema[3]))[0];

    schema[0] = intersect(groups[segments[0]], schema).filter(includes_chars(schema[7]))[0];
    schema[5] = intersect(groups[segments[5]], schema).filter(chars_in(schema[9]))[0];

    schema[2] = intersect(groups[segments[2]], schema)[0];
    schema[6] = intersect(groups[segments[6]], schema)[0];

    return schema;
}

export function decode(parts: string[][]): number {
    const [input, output] = parts;

    const schema = get_schema(input);

    const text = output.map(input => {
        const pairs = Object.entries(schema);
        const match = pairs.find(([, text]) => input === text);
        return match![0];
    }).join('');

    return parseInt(text);
}
