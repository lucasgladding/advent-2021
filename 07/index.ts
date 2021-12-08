import _ from 'lodash';
import {read} from '../helpers';

export function parse(name: string): number[] {
    const contents = read(name);
    return contents.split(',').map(item => parseInt(item));
}

type Cost = (position: number, target: number) => number;

export function run(input: number[], cost: Cost): number {
    const max = _.max(input);
    const costs = Array(max).fill(undefined).map((item, index) => {
        const distances = input.map(position => cost(position, index));
        return _.sum(distances);
    });
    return _.min(costs) ?? 0;
}

export function cost1(position: number, target: number): number {
    return Math.abs(position - target);
}

export function cost2(position: number, target: number): number {
    const distance = Math.abs(position - target);
    return (distance / 2) * (2 + (distance - 1));
}
