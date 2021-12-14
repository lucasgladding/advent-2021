import _ from 'lodash';
import {read} from '../helpers';

type PointInput = [number, number];

type InstructionInput = [string, number];

export function parse(name: string): [PointInput[], InstructionInput[]] {
    const contents = read(name);
    const sections = contents.split('\n\n');
    const points = sections[0].split('\n').map(item => {
        return item.split(',').map(item => parseInt(item)) as PointInput;
    });
    const instructions = sections[1].split('\n').map(item => {
        const pattern = /fold along (.)=(\d+)/;
        const matches = item.match(pattern);
        return [matches![1], parseInt(matches![2])] as InstructionInput;
    });
    return [points, instructions];
}

export class Point {
    static collect(input: PointInput[]): Point[] {
        return input.map(Point.create)
    }

    static create(input: PointInput): Point {
        return new Point(input[0], input[1]);
    }

    constructor(public x: number, public y: number) { }
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
}
