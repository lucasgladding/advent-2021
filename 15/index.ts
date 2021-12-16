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

    get origin(): Point {
        return this.point([0, 0])!;
    }

    get destination(): Point {
        const x = this.map[0].length - 1;
        const y = this.map.length - 1;
        return this.point([x, y])!;
    }

    private point(at: Coordinate): Point | undefined {
        const [x, y] = at;
        if (x < 0 || y < 0)
            return undefined;
        if (!this.map[y] || !this.map[y][x])
            return undefined;
        return new Point(x, y, this.map[y][x]);
    }

    subsequent(from: Point): Point[] {
        const {x, y} = from;
        return [
            this.point([x + 1, y]),
            this.point([x, y + 1]),
        ].filter(point => Boolean(point)) as Point[];
    }
}

export class Item {
    constructor(public point: Point, public parent: Item | undefined = undefined, public items: Item[] = []) { }

    includes(item: Item): boolean {
        const hashes = this.path.map(item => item.hash);
        return hashes.includes(item.hash);
    }

    get hash(): string {
        return this.point.hash;
    }

    get total(): number {
        const items = this.path.slice(1);
        return _.sumBy(items, item => item.point.risk);
    }

    private get path(): Item[] {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let current: Item = this;
        const path = [current];
        while (current.parent) {
            path.push(current.parent);
            current = current.parent;
        }
        return path.reverse();
    }
}

export class Route {
    static create(from: number[][]): Route {
        const grid = new Grid(from);
        return new Route(grid);
    }

    constructor(private grid: Grid) { }

    get score(): number {
        return this.best.total;
    }

    private get best(): Item {
        const paths = this.find();
        return _.minBy(paths, path => path.total)!;
    }

    private find(): Item[] {
        const paths: Item[] = [];
        const root = new Item(this.grid.origin);
        this.expand(root);
        this.traverse(root, this.grid.destination, paths);
        return paths;
    }

    private expand(origin: Item, depth = 0) {
        if (depth > 50)
            return;
        const points = this.grid.subsequent(origin.point);
        for (const point of points) {
            const item = new Item(point, origin);
            if (!origin.includes(item)) {
                origin.items.push(item);
                this.expand(item, depth + 1);
            }
        }
    }

    private traverse(from: Item, destination: Point, routes: Item[]) {
        if (from.hash === destination.hash) {
            routes.push(from);
            return;
        }
        for (const item of from.items) {
            this.traverse(item, destination, routes);
        }
    }
}
