import _ from 'lodash';

const PATTERN = /(\[|]|\d+|,)/g;

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
    let done = false;
    let position = undefined;
    while (!done) {
        position = find_numeric_set(current, 4);
        if (position !== undefined) {
            current = perform_explode(current, position);
            continue;
        }
        position = find_large_numeric(current);
        if (position !== undefined) {
            current = perform_split(current, position);
            continue;
        }
        done = true;
    }
    return current;
}

function find_numeric_set(input: Input, targetDepth = 0): number | undefined {
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

function perform_explode(input: Input, position: number): Input {
    const l = input.slice(0, position);
    const r = input.slice(position + 5);
    const a = input[position + 1] as number;
    const b = input[position + 3] as number;
    return [
        ...replace_first(l.reverse(), a).reverse(),
        0,
        ...replace_first(r, b),
    ];
}

function replace_first(input: Input, increment: number): Input {
    const output = [...input];
    const index = _.findIndex(input, item => typeof item === 'number');
    if (index !== undefined) {
        const basis = input[index] as number;
        output[index] = basis + increment;
    }
    return output;
}

function find_large_numeric(input: Input): number | undefined {
    for (const [index, item] of input.entries()) {
        if (typeof item === 'number') {
            if (item >= 10) {
                return index;
            }
        }
    }
    return undefined;
}

function perform_split(input: Input, position: number): Input {
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
    let done = false;
    let position = undefined;
    while (!done) {
        position = find_numeric_set(current);
        if (position !== undefined) {
            current = perform_expand(current, position);
            continue;
        }
        done = true;
    }
    return current[0] as number;
}

function perform_expand(input: Input, position: number) {
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

export function get_unique_inputs(input: Input[]): Input[][] {
    const output = [];
    for (const [index, item] of input.entries()) {
        const rest = [
            ...input.slice(0, index),
            ...input.slice(index + 1),
        ];
        for (const a of rest) {
            output.push([item, a]);
        }
    }
    return output;
}
