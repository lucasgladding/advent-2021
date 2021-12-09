import _ from 'lodash';
import {read} from '../helpers';

export function parse(name: string): Point[][] {
    const contents = read(name);
    return contents.split('\n').map((item, y) => {
        return item.split('').map((height, x) => {
            return new Point(x, y, parseInt(height));
        })
    });
}

export class Heightmap {
    constructor(private points: Point[][]) { }

    get level(): number {
        return _.sum(this.lowest.map(item => 1 + item.height));
    }

    get lowest(): Point[] {
        const lowest = [];
        const height = this.points.length;
        const width = this.points[0].length;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const current = this.point(x, y)!;
                const adjacent = ([
                    this.point(x - 1, y),
                    this.point(x + 1, y),
                    this.point(x, y - 1),
                    this.point(x, y + 1),
                ].filter(height => height !== undefined)) as Point[];
                const lowestAdjacentHeight = _.min(adjacent.map(point => point.height))!;

                if (current.height < lowestAdjacentHeight)
                    lowest.push(current);
            }
        }
        return lowest;
    }

    private point(x: number, y: number) {
        if (!this.points[y])
            return undefined;
        return this.points[y][x];
    }
}

class Point {
    constructor(public x: number, public y: number, public height: number) { }
}
