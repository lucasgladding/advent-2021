import _ from 'lodash';

type Item = Pair | number;
type Pair = [Item, Item];

export function add(a: Pair, b: Pair): Pair {
    return [a, b];
}

export function search(parent: Item, fn: SearchFn, path: number[] = []): number[] | undefined {
    if (fn(parent, path))
        return path;
    if (!Array.isArray(parent))
        return undefined;
    for (const [index, item] of parent.entries()) {
        const match = search(item, fn, [...path, index]);
        if (match)
            return match;
    }
    return undefined;
}

export type SearchFn = (parent: Item, path: number[] | undefined) => boolean;

export const can_explode: SearchFn = (parent, path = []) => {
    return Array.isArray(parent) && typeof parent[0] === 'number' && typeof parent[1] === 'number' && path.length >= 4;
};

export function explode(parent: Pair, path: number[]) {
    const indexes = path.slice(0, -1);
    const index = path.slice(-1)[0];
    const subject = _.get(parent, path);
    const target = _.get(parent, indexes);
    if (index === 0) {
        const sum = subject[1] + target[1]
        _.set(parent, [...indexes, 0], 0);
        _.set(parent, [...indexes, 1], sum);
    }
}

export function trim(input: number[], target: number): number[] {
    const tacos = input.reverse();

    return input;
}

export const can_split: SearchFn = (parent, path = []) => {
    const match = typeof parent === 'number' &&
        parent >= 10;
    if (match)
        console.log('can_split', [parent, path]);
    return match;
};

export function split(parent: Pair, path: number[]) {
    const subject = _.get(parent, path);
    const a = Math.floor(subject / 2);
    const b = Math.ceil(subject / 2);
    _.set(parent, path, [a, b]);
}
