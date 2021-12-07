import _ from 'lodash';
import {read} from '../helpers';

export function parse(name: string): number[] {
    const contents = read(name);
    return contents.split(',').map(item => parseInt(item));
}

export function cost1(input: number[], target: number): number {
    const distances = input.map(position => Math.abs(position - target));
    return _.sum(distances);
}

export function run1(input: number[]): number {
    const max = _.max(input);
    const costs = Array(max).fill(undefined).map((item, index) => {
        return cost1(input, index);
    });
    return _.min(costs) ?? 0;
}

export function cost2(input: number[], target: number): number {
    const distances = input.map(position => {
        const distance = Math.abs(position - target);
        return (distance / 2) * (2 + (distance - 1));
    });
    return _.sum(distances);
}
export function run2(input: number[]): number {
    const max = _.max(input);
    const costs = Array(max).fill(undefined).map((item, index) => {
        return cost2(input, index);
    });
    return _.min(costs) ?? 0;
}
