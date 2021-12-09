import _ from 'lodash';
import {read} from '../helpers';

export function parse(name: string): number[][] {
    const contents = read(name);
    return contents.split('\n').map(item => item.split('').map(item => parseInt(item)));
}

export class Heightmap {
    constructor(private points: number[][]) { }

    get level(): number {
        return _.sum(this.lowest.map(item => 1 + item));
    }

    get lowest(): number[] {
        const lowest = [];
        const height = this.points.length;
        const width = this.points[0].length;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const height = this.height(x, y)!;
                const adjacent = ([
                    this.height(x - 1, y),
                    this.height(x + 1, y),
                    this.height(x, y - 1),
                    this.height(x, y + 1),
                ].filter(height => height !== undefined));
                const lowestAdjacentHeight = _.min(adjacent) as number;

                if (height < lowestAdjacentHeight)
                    lowest.push(height);
            }
        }
        return lowest;
    }

    private height(x: number, y: number) {
        if (!this.points[y])
            return undefined;
        return this.points[y][x];
    }
}
