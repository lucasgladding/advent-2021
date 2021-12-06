import _ from 'lodash';
import {read} from '../helpers';

export function parse1(name: string): School {
    const contents = read(name);
    const items = contents.split(',').map(text => parseInt(text)).map(timer => new Lanternfish(timer));
    return new School(items);
}

export function parse2(name: string): number[] {
    const contents = read(name);
    const items = _.countBy(contents.split(',').map(text => parseInt(text)));
    return [
        items[0] || 0,
        items[1] || 0,
        items[2] || 0,
        items[3] || 0,
        items[4] || 0,
        items[5] || 0,
        items[6] || 0,
        items[7] || 0,
        items[8] || 0,
    ];
}

export class Lanternfish {
    constructor(public timer: number = 8) { }

    get canCreate(): boolean {
        return this.timer === 0;
    }

    run() {
        if (this.timer > 0) {
            this.timer--;
        } else {
            this.timer = 6;
        }
    }
}

export class School {
    constructor(public items: Lanternfish[]) { }

    get size(): number {
        return this.items.length;
    }

    loop(times: number) {
        for (let i = 0; i < times; i++) {
            const created: Lanternfish[] = [];
            for (const item of this.items) {
                if (item.canCreate)
                    created.push(new Lanternfish());
                item.run();
            }
            this.items.push(...created);
        }
    }
}

export function loop2(input: number[], times: number): number {
    let current = input;
    for (let i = 0; i < times; i++) {
        current = [
            current[1] || 0,
            current[2] || 0,
            current[3] || 0,
            current[4] || 0,
            current[5] || 0,
            current[6] || 0,
            (current[7] + current[0]) || 0,
            current[8] || 0,
            current[0] || 0,
        ];
    }
    return _.sum(current);
}
