import {read} from '../helpers';

export function parse(name: string): School {
    const contents = read(name);
    const items = contents.split(',').map(text => parseInt(text)).map(timer => new Lanternfish(timer));
    return new School(items);
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

    run() {
        const created: Lanternfish[] = [];
        this.items.forEach((item) => {
            if (item.canCreate) {
                created.push(new Lanternfish());
            }
            item.run();
        });
        this.items.push(...created);
    }
}
