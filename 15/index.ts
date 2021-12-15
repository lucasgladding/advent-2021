import {read} from '../helpers';

export function parse(name: string): number[][] {
    const contents = read(name);
    return contents.split('\n').map(item => item.split('').map(item => parseInt(item)));
}

type Coordinate = [number, number];

class Point {
    constructor(
        public coordinate: Coordinate,
        public risk: number,
    ) { }
}

export class Grid {
    constructor(private map: number[][]) { }

    point(at: Coordinate): Point | undefined {
        const [x, y] = at;
        if (x < 0 || y < 0)
            return undefined;
        if (!this.map[y] || !this.map[y][x])
            return undefined;
        return new Point(at, this.map[y][x]);
    }

    destinations(from: Point): Point[] {
        const [x, y] = from.coordinate;
        return [
            // this.point([x - 1, y]),
            // this.point([x, y - 1]),
            this.point([x + 1, y]),
            this.point([x, y + 1]),
        ].filter(point => Boolean(point)) as Point[];
    }
}

class Item {
    constructor(public point: Point, public parent: Item | undefined = undefined, public items: Item[] = []) { }

    get path(): string[] {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let current: Item = this;
        const path = [current.hash];
        while (current.parent) {
            path.push(current.parent.hash);
            current = current.parent;
        }
        return path.reverse();
    }

    get hash(): string {
        const coordinate = this.point.coordinate;
        return `${coordinate[0]},${coordinate[1]}`;
    }
}

export class Path {
    constructor(private grid: Grid) { }

    origin(): Item {
        const point = this.grid.point([0, 0])!;
        return new Item(point);
    }

    expand(origin: Item, depth = 0) {
        if (depth > 10)
            return;
        const points = this.grid.destinations(origin.point);
        for (const point of points) {
            const item = new Item(point, origin);
            if (!origin.path.includes(item.hash)) {
                origin.items.push(item);
                this.expand(item, depth + 1);
            }
        }
    }

    get total(): number {
        return 0;
    }
}
