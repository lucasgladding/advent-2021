import _ from 'lodash';
import {read} from '../helpers';

type Point = [number, number];

type Line = [Point, Point];

type Select = <T>(input: T[] | undefined) => T | undefined;

export function parse(name: string): Line[] {
    const contents = read(name);
    return contents.split('\n')
        .map(item => item.split(' -> ')
            .map(item => item.split(',')
                .map(item => parseInt(item)))) as Line[];
}

function pick(input: Line[], select: Select) {
    return _.flow([
        _.flatten,
        (item) => _.map(item, select),
        _.max,
    ])(input);
}

export function bounds(input: Line[]): Point {
    const x = pick(input, _.head);
    const y = pick(input, _.last);
    return [x, y];
}

function change(a: number, b: number): number {
    if (a === b) return 0;
    return b > a ? 1 : -1;
}

function diagonal(dx: number, dy: number): boolean {
    return dx !== 0 && dy !== 0;
}

function inside(subject: number, range: number[]): boolean {
    return subject >= (_.min(range) as number) && subject <= (_.max(range) as number);
}

export class Grid {
    points: number[][];

    constructor(point: Point) {
        this.points = Array(point[1] + 1).fill(undefined).map(_ => Array(point[0] + 1).fill(0))
    }

    draw(line: Line) {
        const [xs, ys] = _.zip(...line) as number[][];
        const dx = change(xs[0], xs[1]);
        const dy = change(ys[0], ys[1]);
        if (diagonal(dx, dy))
            return;
        let x = line[0][0];
        let y = line[0][1];
        while (inside(x, xs) && inside(y, ys)) {
            this.points[y][x]++;
            x += dx;
            y += dy;
        }
    }

    toString(): string {
        return this.points.map(item => item.join(' ')).join('\n').replace(/0/g, '.');
    }

    get overlaps(): number {
        const threshold = 2;
        return _.flatten(this.points).filter(item => item >= threshold).length;
    }
}
