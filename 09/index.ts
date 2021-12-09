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
                const adjacent = this.adjacent(x, y);
                const lowestAdjacentHeight = _.min(adjacent.map(point => point.height))!;

                if (current.height < lowestAdjacentHeight)
                    lowest.push(current);
            }
        }
        return lowest;
    }

    private adjacent(x: number, y: number): Point[] {
        return [
            this.point(x - 1, y),
            this.point(x + 1, y),
            this.point(x, y - 1),
            this.point(x, y + 1),
        ].filter(point => point !== undefined) as Point[];
    }

    private point(x: number, y: number) {
        if (!this.points[y])
            return undefined;
        return this.points[y][x];
    }

    get product(): number {
        const basins = _.sortBy(this.basins, basin => basin.size).reverse();
        const subjects = basins.slice(0, 3);
        return subjects.reduce((acc, item) => {
            return acc * item.size;
        }, 1);
    }

    private get basins(): Basin[] {
        return this.lowest.map(point => this.basinAt(point));
    }

    private basinAt(point: Point): Basin {
        const basin = new Basin([point]);
        this.expand(basin, point);
        return basin;
    }

    private expand(basin: Basin, from: Point) {
        const adjacent = this.adjacent(from.x, from.y);
        for (const point of adjacent) {
            if (point.height === 9)
                continue;
            if (basin.hasPoint(point))
                continue;
            basin.append(point);
            this.expand(basin, point);
        }
    }
}

export class Point {
    constructor(public x: number, public y: number, public height: number) { }

    isEqual(to: Point): boolean {
        return to.x === this.x && to.y === this.y;
    }
}

export class Basin {
    constructor(private points: Point[] = []) { }

    append(point: Point) {
        this.points.push(point);
    }

    hasPoint(point: Point): boolean {
        const match = this.points.find(item => item.isEqual(point));
        return match !== undefined;
    }

    get size(): number {
        return this.points.length;
    }
}
