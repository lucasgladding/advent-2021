import _ from 'lodash';
import {read} from '../helpers';

export function parse1(name: string): number[][] {
    const contents = read(name);
    return contents.split('\n').map(item => item.split('').map(item => parseInt(item)));
}

function duplicate(input: number[][]) {
    const output: number[][] = [];
    for (let i = 0; i < 5; i++) {
        const group = input.map(item => {
            const output = [];
            for (let j = 0; j < 5; j++) {
                output.push(...increment(item, i + j));
            }
            return output;
        });
        output.push(...group);
    }
    return output;
}

function increment(input: number[], amount = 1): number[] {
    return input.map(item => (item + amount - 1) % 9 + 1);
}

export function parse2(name: string): number[][] {
    const input = parse1(name);
    return duplicate(input);
}

class Item {
    constructor(public x: number, public y: number, public risk: number) { }

    get hash(): string {
        return [this.x, this.y].join(',');
    }
}

export class Grid {
    constructor(protected map: number[][]) { }

    get(x: number, y: number): Item | undefined {
        if (x < 0 || y < 0)
            return undefined;
        if (!this.map[y] || !this.map[y][x])
            return undefined;
        return new Item(x, y, this.map[y][x]);
    }

    path(from: Item, to: Item): Item[] {
        const openSet: Set<Item> = new Set([from]);

        const parents = new Map<string, Item>();

        const gScores = new Map<string, number>();
        gScores.set(from.hash, 0);

        const fScores = new Map<string, number>();
        fScores.set(from.hash, this.h(from, to));

        while (openSet.size > 0) {
            const current = _.sortBy(Array.from(openSet.values()), item => this.getScore(fScores, item))[0];
            if (current.hash === to.hash) {
                return this.reconstruct(parents, current);
            }

            openSet.delete(current);

            for (const neighbor of this.next(current)) {
                const tentative_gScore = this.getScore(gScores, current) + this.distance(neighbor);
                if (tentative_gScore < this.getScore(gScores, neighbor)) {
                    parents.set(neighbor.hash, current);
                    gScores.set(neighbor.hash, tentative_gScore);
                    fScores.set(neighbor.hash, tentative_gScore + this.h(neighbor, to));
                    if (!openSet.has(neighbor)) {
                        openSet.add(neighbor);
                    }
                }
            }
        }

        throw new Error('Could not reach goal');
    }

    private h(to: Item, from: Item): number {
        return (Math.abs(to.x - from.x) + Math.abs(to.x + from.x)) * 5;
    }

    private getScore(from: Map<string, number>, item: Item): number {
        return from.get(item.hash) ?? Infinity;
    }

    private next(to: Item): Item[] {
        const {x, y} = to;
        return [
            this.get(x - 1, y),
            this.get(x + 1, y),
            this.get(x, y - 1),
            this.get(x, y + 1),
        ].filter(item => Boolean(item)) as Item[];
    }

    private reconstruct(cameFrom: Map<string, Item>, to: Item): Item[] {
        let current = to;
        const total_path: Item[] = [current];
        while (cameFrom.has(current.hash)) {
            current = cameFrom.get(current.hash)!;
            total_path.unshift(current);
        }
        return total_path;
    }

    protected distance(to: Item) {
        return to.risk;
    }
}

export function sum(path: Item[]): number {
    return _.sumBy(path.slice(1), item => item.risk);
}

