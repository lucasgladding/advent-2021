import _ from 'lodash';
import {read} from '../helpers';

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

export class Graph1 {
    private root = new Item('start');

    constructor(private inputs: Path[]) {
        this.expand();
    }

    private expand(source?: Item) {
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

    protected proceed(source: Item, target: string): boolean {
        if (source.text === 'end')
            return false;
        if (target === 'start')
            return false;
        if (target === 'end')
            return true;
        if (target === target.toUpperCase())
            return true;
        return !this.path(source).includes(target);
    }

    protected path(source: Item): string[] {
        let current = source;
        const path = [current.text];
        while (current.parent) {
            current = current.parent;
            path.push(current.text);
        }
        return path.reverse();
    }

    get paths(): string[][] {
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

function getLC(path: string[]): string[] {
    return path.filter(input => !['start', 'end'].includes(input) && input === input.toLowerCase());
}

export class Graph2 extends Graph1 {
    protected proceed(source: Item, target: string): boolean {
        if (source.text === 'end')
            return false;
        if (target === 'start')
            return false;
        if (target === 'end')
            return true;
        if (target === target.toUpperCase())
            return true;
        const path = this.path(source);
        if (!path.includes(target))
            return true;
        const pathLC = getLC(path);
        const uniquePathLC = _.uniq(pathLC);
        return pathLC.length === uniquePathLC.length;
    }
}
