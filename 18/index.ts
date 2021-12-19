import _ from 'lodash';

const LIMIT = 1000;
const PATTERN = /(\[|\]|\d+|,)/g;

type Input = (string | number)[];

export function parse(text: string): Input {
    const matches = text.match(PATTERN) as string[];
    return matches.map(item => {
        const int = parseInt(item);
        return isNaN(int) ? item : int;
    });
}

export function sum(input: Input[]): Input {
    let current = reduce(input[0]);
    for (const item of input.slice(1)) {
        const sum = add(current, item);
        current = reduce(sum);
    }
    return current;
}

export function add(a: Input, b: Input): Input {
    return ['[', ...a, ',', ...b, ']'];
}

export function reduce(input: Input): Input {
    let current = input;
    let position = undefined;
    for (let i = 0; i < LIMIT; i++) {
        position = get_pair(current, 4);
        if (position !== undefined) {
            current = explode(current, position);
            continue;
        }
        position = get_large_number(current);
        if (position !== undefined) {
            current = split(current, position);
            continue;
        }
    }
    return current;
}

function get_pair(input: Input, targetDepth = 0): number | undefined {
    let depth = 0;
    let numbers = 0;
    for (const [index, item] of input.entries()) {
        if (item === '[') {
            depth++;
            numbers = 0;
        }
        if (item === ']') {
            depth--;
            numbers = 0;
        }
        if (typeof item === 'number') {
            numbers++;
            if (numbers === 2 && depth > targetDepth) {
                return index - 3;
            }
        }
    }
    return undefined;
}

function explode(input: Input, position: number): Input {
    const l = input.slice(0, position);
    const r = input.slice(position + 5);
    const a = input[position + 1] as number;
    const b = input[position + 3] as number;
    return [
        ...replace(l.reverse(), a).reverse(),
        0,
        ...replace(r, b),
    ];
}

function replace(input: Input, increment: number): Input {
    const output = [...input];
    const index = _.findIndex(input, item => typeof item === 'number');
    if (index !== undefined) {
        const basis = input[index] as number;
        output[index] = basis + increment;
    }
    return output;
}

function get_large_number(input: Input): number | undefined {
    for (const [index, item] of input.entries()) {
        if (typeof item === 'number') {
            if (item >= 10) {
                return index;
            }
        }
    }
    return undefined;
}

function split(input: Input, position: number): Input {
    const l = input.slice(0, position);
    const r = input.slice(position + 1);
    const a = input[position] as number;
    return [
        ...l,
        '[',
        Math.floor(a / 2),
        ',',
        Math.ceil(a / 2),
        ']',
        ...r,
    ];
}

export function checksum(input: Input): number {
    let current = input;
    let position = undefined;
    for (let i = 0; i < LIMIT; i++) {
        position = get_pair(current);
        if (position !== undefined) {
            current = expand(current, position);
            continue;
        }
    }
    return current[0] as number;
}

function expand(input: Input, position: number) {
    const l = input.slice(0, position);
    const r = input.slice(position + 5);
    const a = input[position + 1] as number;
    const b = input[position + 3] as number;
    return [
        ...l,
        3 * a + 2 * b,
        ...r,
    ];
}
