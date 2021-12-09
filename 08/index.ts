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

function is_length(target: number): EvaluationFn {
    return subject => target === subject.length;
}

function intersect(input: string[], schema: Schema): string[] {
    return input.filter(item => !Object.values(schema).includes(item))
}

function get_schema(input: string[]): Schema {
    const groups = _.groupBy(input, item => item.length);

    const schema: Schema = {};
    schema[1] = input.filter(is_length(segments[1]))[0];
    schema[4] = input.filter(is_length(segments[4]))[0];
    schema[7] = input.filter(is_length(segments[7]))[0];
    schema[8] = input.filter(is_length(segments[8]))[0];

    schema[3] = groups[5].filter(includes_chars(schema[7]))[0];
    schema[9] = groups[6].filter(includes_chars(schema[3]))[0];

    schema[0] = intersect(groups[6], schema).filter(includes_chars(schema[7]))[0];
    schema[5] = intersect(groups[5], schema).filter(chars_in(schema[9]))[0];

    schema[2] = intersect(groups[5], schema)[0];
    schema[6] = intersect(groups[6], schema)[0];

    return Object.entries(schema).reduce((acc, item) => {
        acc[item[0]] = cleanup(item[1]);
        return acc;
    }, {} as Schema);
}

export function decode(parts: string[][]): number {
    const [input, output] = parts;

    const schema = get_schema(input);

    const text = output.map(cleanup).map(item => {
        const pairs = Object.entries(schema);
        const match = pairs.find(pair => pair[1] === item);
        return match![0];
    }).join('');

    return parseInt(text);
}
