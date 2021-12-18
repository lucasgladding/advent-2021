import _ from 'lodash';

const PATTERN = /(\[|\]|\d+)/g;

type Input = (string | number)[];
type Range = [number, number];

export function parse(text: string): Input {
    const matches = text.match(PATTERN) as string[];
    return matches.map(item => {
        const int = parseInt(item);
        return isNaN(int) ? item : int;
    });
}

export function evaluate(input: Input) {
    let current = input;
    for (let i = 0; i < 5; i++) {
        const position = get_explode(current);
        if (position !== undefined) {
            current = explode(current, position);
            continue;
        }
    }
    console.log(current);
}

function get_explode(input: Input): number | undefined {
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
            if (numbers === 2 && depth > 4) {
                return index - 2;
            }
        }
    }
    return undefined;
}

function explode(input: Input, position: number): Input {
    const l = input.slice(0, position);
    const r = input.slice(position + 4);
    const a = input[position + 1] as number;
    const b = input[position + 2] as number;
    return [
        ...replace(l.reverse(), a).reverse(),
        0,
        ...replace(r, b),
    ];
}

function replace(input: Input, increment: number): Input {
    const output = [...input];
    const index = _.findIndex(input, item => typeof item === 'number');
    if (input[index]) {
        const base = input[index] as number;
        output[index] = base + increment;
    }
    return output;
}
