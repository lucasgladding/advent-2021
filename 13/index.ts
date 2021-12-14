import _ from 'lodash';
import {read} from '../helpers';

type Coordinate = [number, number];

type Instruction = [string, number];

export function parse(name: string): [Coordinate[], Instruction[]] {
    const contents = read(name);
    const sections = contents.split('\n\n');
    const points = sections[0].split('\n').map(item => {
        return item.split(',').map(item => parseInt(item)) as Coordinate;
    });
    const instructions = sections[1].split('\n').map(item => {
        const pattern = /fold along (.)=(\d+)/;
        const matches = item.match(pattern);
        return [matches![1], parseInt(matches![2])] as Instruction;
    });
    return [points, instructions];
}

export class Point {
    static collect(input: Coordinate[]): Point[] {
        return input.map(Point.create)
    }

    static create(input: Coordinate): Point {
        return new Point(input[0], input[1]);
    }

    constructor(public x: number, public y: number) { }

    perform(instruction: Instruction): Point {
        const [direction, position] = instruction;
        if (direction === 'x') {
            const x = this.x > position ? position - (this.x - position) : this.x;
            return new Point(x, this.y);
        } else {
            const y = this.y > position ? position - (this.y - position) : this.y;
            return new Point(this.x, y);
        }
    }
}

export class Page {
    constructor(public points: Point[]) { }

    get boundsX(): number {
        return _.max(this.points.map(item => item.x))! + 1;
    }

    get boundsY(): number {
        return _.max(this.points.map(item => item.y))! + 1;
    }

    debug(): string {
        let output = '';
        for (let y = 0; y < this.boundsY; y++) {
            for (let x = 0; x < this.boundsX; x++) {
                output += this.contains(x, y) ? '#' : '.';
            }
            output += '\n';
        }
        return output;
    }

    contains(x: number, y: number): boolean {
        const match = this.points.find(point => point.x === x && point.y === y);
        return match !== undefined;
    }

    perform(instruction: Instruction) {
        const points = this.points.map(point => point.perform(instruction));
        return new Page(points);
    }

    get count(): number {
        const output = this.debug();
        const match = output.match(/#/g);
        return match!.length;
    }
}
