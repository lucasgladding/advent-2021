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
}

// ): 3 points.
// ]: 57 points.
// }: 1197 points.
// >: 25137 points.
export function score(input: string[]): number {
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
