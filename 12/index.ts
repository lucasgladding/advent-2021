import {read} from '../helpers';
import * as Path from 'path';

type Path = [string, string];

export function parse(name: string): Path[] {
    const contents = read(name);
    return contents.split('\n').map(item => {
        return item.split('-') as Path;
    });
}

class Item {
    public items: Item[] = []

    constructor(public text: string, public parent: Item | undefined = undefined) { }
}

export class Graph {
    private root = new Item('start');

    constructor(private inputs: Path[]) { }

    expand(source?: Item) {
        const current = source ?? this.root
        const targets = this.targets(current.text);
        for (const target of targets) {
            if (!this.proceed(current, target))
                continue;
            const next = new Item(target, current);
            current.items.push(next);
            this.expand(next);
        }
    }

    private targets(source: string): string[] {
        const inputs = this.inputs.filter(input => input.includes(source));
        const targets = inputs.map(input => input.find(i => i !== source)!);
        return targets.sort();
    }

    private proceed(source: Item, target: string): boolean {
        if (source.text === 'end')
            return false;
        if (target === 'start')
            return false;
        if (target === target.toUpperCase())
            return true;
        return !this.path(source).includes(target);
    }

    private path(source: Item): string[] {
        let current = source;
        const path = [current.text];
        while (current.parent) {
            current = current.parent;
            path.push(current.text);
        }
        return path.reverse();
    }

    debug(): string[][] {
        const output: string[][] = [];
        this.traverse(this.root, output);
        return output;
    }

    private traverse(source: Item, output: string[][]) {
        if (source.text === 'end') {
            const path = this.path(source);
            output.push(path);
            return;
        }
        for (const item of source.items) {
            this.traverse(item, output);
        }
    }
}
