import {read} from '../helpers';
import * as Path from 'path';

type Path = [string, string];

export function parse(name: string) {
    const contents = read(name);
    return contents.split('\n').map(item => {
        return item.split('-') as Path;
    });
}

class Item {

    public items: Item[] = []

    constructor(public text: string, public parent: Item | undefined = undefined) {
        this.text = text;
    }
};

export class Graph {
    private root: Item

    constructor(private inputs: Path[]) {
        this.root = new Item('start');
    }

    expand(item?: Item) {
        const current = item ?? this.root
        const targets = this.targets(current.text);
        for (const target of targets) {
            if (!this.proceed(current, target))
                continue;
            const next = new Item(target, current);
            current.items.push(next);
            this.expand(next);
        }
    }

    private targets(origin: string): string[] {
        const inputs = this.inputs.filter(input => input.includes(origin));
        const targets = inputs.map(input => input.find(i => i !== origin)!);
        return targets.sort();
    }

    private proceed(item: Item, target: string) {
        if (item.text === 'end')
            return false;
        if (target === 'start')
            return false;
        if (target === target.toUpperCase())
            return true;
        const path = this.path(item);
        return !path.includes(target);
    }

    private path(item: Item) {
        let current = item;
        const path = [current.text];
        while (current.parent) {
            current = current.parent;
            path.push(current.text);
        }
        return path.reverse();
    }
}
