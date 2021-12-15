import _ from 'lodash';
import {read} from '../helpers';

export function parse(name: string): number[][] {
    const contents = read(name);
    return contents.split('\n').map(item => item.split('').map(item => parseInt(item)));
}

type Coordinate = [number, number];

class Point {
    constructor(
        public x: number,
        public y: number,
        public risk: number,
    ) { }

    get hash(): string {
        return `${this.x},${this.y}`;
    }
}

export class Grid {
    constructor(private map: number[][]) { }

    point(at: Coordinate): Point | undefined {
        const [x, y] = at;
        if (x < 0 || y < 0)
            return undefined;
        if (!this.map[y] || !this.map[y][x])
            return undefined;
        return new Point(x, y, this.map[y][x]);
    }

    nexts(from: Point): Point[] {
        const {x, y} = from;
        return [
            // this.point([x - 1, y]),
            // this.point([x, y - 1]),
            this.point([x + 1, y]),
            this.point([x, y + 1]),
        ].filter(point => Boolean(point)) as Point[];
    }
}

export class Item {
    constructor(public point: Point, public parent: Item | undefined = undefined, public items: Item[] = []) { }

    get hashes(): string[] {
        return this.path.map(item => item.hash);
    }

    get total(): number {
        const items = this.path.slice(1);
        return _.sumBy(items, item => item.point.risk);
    }

    get path(): Item[] {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let current: Item = this;
        const path = [current];
        while (current.parent) {
            path.push(current.parent);
            current = current.parent;
        }
        return path.reverse();
    }

    get hash(): string {
        return this.point.hash;
    }
}

export class Route {
    constructor(private grid: Grid) { }

    lowest(origin: Point, destination: Point): Item {
        const paths = this.find(origin, destination);
        return lowest(paths);
    }

    find(origin: Point, destination: Point): Item[] {
        const paths: Item[] = [];
        const root = new Item(origin);
        this.expand(root);
        this.traverse(root, destination, paths);
        return paths;
    }

    expand(origin: Item, depth = 0) {
        if (depth > 50)
            return;
        const points = this.grid.nexts(origin.point);
        for (const point of points) {
            const item = new Item(point, origin);
            if (!origin.hashes.includes(item.hash)) {
                origin.items.push(item);
                this.expand(item, depth + 1);
            }
        }
    }

    traverse(from: Item, destination: Point, routes: Item[]) {
        if (from.hash === destination.hash) {
            routes.push(from);
            return;
        }
        for (const item of from.items) {
            this.traverse(item, destination, routes);
        }
    }
}

export function lowest(items: Item[]): Item {
    return _.minBy(items, item => item.total)!;
}
