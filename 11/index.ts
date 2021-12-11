import _ from 'lodash';
import {read} from '../helpers';

export function parse(name: string): Grid {
    const contents = read(name);
    const items = contents.split('\n').map((text, y) => {
        return text.split('').map((char, x) => {
            return new Octopus(x, y, parseInt(char));
        });
    });
    return new Grid(items);
}

export class Grid {
    constructor(private items: Octopus[][]) { }

    iterate(steps: number): number {
        let count = 0;
        const items = _.flatten(this.items);
        for (let i = 0; i < steps; i++) {
            this.next();
            const flashers = items.filter(item => item.level === 0);
            count += flashers.length;
        }
        return count;
    }

    find(): number {
        const items = _.flatten(this.items);
        for (let i = 1; i < 500; i++) {
            this.next();
            const flashers = items.filter(item => item.level === 0);
            if (flashers.length === items.length)
                return i;
        }
        return 0;
    }

    next(): number {
        let count = 0;
        const items = _.flatten(this.items);
        items.forEach(current => {
            current.level++;
        });
        items.forEach(current => {
            if (current.level > 9) {
                this.flash(current);
                count++;
            }
        });
        return count;
    }

    flash(item: Octopus) {
        item.reset();
        const adjacent = this.adjacent(item.x, item.y);
        adjacent.forEach(target => {
            if (target.level === 0)
                return;
            target.level++;
            if (target.level > 9) {
                this.flash(target);
            }
        });
    }

    private adjacent(x: number, y: number): Octopus[] {
        return [
            this.item(x, y - 1),
            this.item(x + 1, y - 1),
            this.item(x + 1, y),
            this.item(x + 1, y + 1),
            this.item(x, y + 1),
            this.item(x - 1, y + 1),
            this.item(x - 1, y),
            this.item(x - 1, y - 1),
        ].filter(item => item !== undefined) as Octopus[];
    }

    private item(x: number, y: number): Octopus | undefined {
        if (!this.items[y]) {
            return undefined;
        }
        return this.items[y][x];
    }

    toString(): string {
        return this.items.map(items => items.map(item => item.level).join('')).join('\n');
    }
}

export class Octopus {
    constructor(public x: number, public y: number, public level: number) { }

    reset() {
        this.level = 0;
    }
}
