import _ from 'lodash';
import {read} from '../helpers';

export function parse(name: string): string[] {
    const contents = read(name);
    return contents.split('\n');
}

type Pair = [string, string];

const pairs: Pair[] = [
    ['(', ')'],
    ['[', ']'],
    ['{', '}'],
    ['<', '>'],
];

function find(item: string): Pair {
    return pairs.find(p => p.includes(item)) as Pair;
}

class IllegalCharacterException {
    constructor(public expected: string, public found: string) { }
}

class IncompleteException {
    constructor(public missing: string) { }
}

// If a chunk opens with (, it must close with ).
// If a chunk opens with [, it must close with ].
// If a chunk opens with {, it must close with }.
// If a chunk opens with <, it must close with >.
function scan(input: string) {
    const stack: string[] = [];
    input.split('').forEach(received => {
        if (pairs.map(_.head).includes(received)) {
            stack.push(received);
        }
        if (pairs.map(_.last).includes(received)) {
            const open = _.last(stack)!;
            const expected = find(open)[1];
            if (received === expected) {
                stack.pop();
            } else {
                throw new IllegalCharacterException(expected, received);
            }
        }
    });
    if (stack.length > 0) {
        const missing = stack.reverse().map(open => find(open)[1]).join('');
        throw new IncompleteException(missing);
    }
}

// ): 3 points.
// ]: 57 points.
// }: 1197 points.
// >: 25137 points.
export function score1(input: string[]): number {
    const invalid = [];
    for (const item of input) {
        try {
            scan(item);
        } catch (exception) {
            if (exception instanceof IllegalCharacterException) {
                invalid.push(exception.found);
            }
        }
    }
    const points: Record<string, number> = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137,
    };
    const scores = invalid.map(item => points[item]);
    return _.sum(scores);
}

function mid(input: number[]): number {
    const target = (input.length - 1) / 2;
    return input[target];
}

// ): 1 point.
// ]: 2 points.
// }: 3 points.
// >: 4 points.
export function score2(input: string[]): number {
    const incomplete = [];
    for (const item of input) {
        try {
            scan(item);
        } catch (exception) {
            if (exception instanceof IncompleteException) {
                incomplete.push(exception.missing);
            }
        }
    }
    const points: Record<string, number> = {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4,
    };
    const scores = incomplete.map(item => {
        return item.split('').reduce((acc, item) => {
            return acc * 5 + points[item];
        }, 0);
    });
    const sorted = scores.sort(function(a, b) {
        return a - b;
    });
    return mid(sorted);
}
