import _ from 'lodash';
import {read} from '../helpers';

type Instruction = [string, string];

type InstructionSet = Record<string, string>;

export function parse(name: string): [string, InstructionSet] {
    const contents = read(name);
    const sections = contents.split('\n\n');
    const base = sections[0];
    const instructions = sections[1].split('\n').map(item => item.split(' -> ') as Instruction);
    const instructionSet = instructions.reduce((acc, item) => {
        acc[item[0]] = item[1];
        return acc;
    }, {} as InstructionSet);
    return [base, instructionSet];
}

function getGroups(input: string): string[] {
    const output: string[] = [];
    for (let i = 1; i < input.length; i++) {
        output.push(input[i - 1] + input[i]);
    }
    return output;
}

export class Template {
    static create(groups: string[]): Template {
        let input = groups[0][0];
        for (const group of groups) {
            input += group.slice(1);
        }
        return new Template(input);
    }

    constructor(private input: string) { }

    private get groups(): string[] {
        return getGroups(this.input);
    }

    process(instructions: InstructionSet, steps: number): Template {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let current: Template = this;
        for (let i = 0; i < steps; i++) {
            current = current.insert(instructions);
        }
        return current;
    }

    private insert(instructions: InstructionSet): Template {
        const groups = this.groups.map(group => {
            const instruction = instructions[group];
            if (instruction) {
                return group[0] + instruction + group[1];
            }
            return group;
        });
        return Template.create(groups);
    }

    get size(): number {
        return this.input.length;
    }

    get score(): number {
        const counts = _.countBy(this.input.split(''));
        const most = _.maxBy(Object.entries(counts), item => item[1])![1];
        const least = _.minBy(Object.entries(counts), item => item[1])![1];
        return most - least;
    }
}

export class Template2 {
    static create(input: string): Template2 {
        const groups = getGroups(input);
        const stats = _.countBy(groups);
        return new Template2(input[0], stats);
    }

    constructor(private first: string, private stats: Record<string, number>) { }

    process(instructions: InstructionSet, steps: number): Template2 {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let current: Template2 = this;
        for (let i = 0; i < steps; i++) {
            current = current.insert(instructions);
        }
        return current;
    }

    insert(instructions: InstructionSet): Template2 {
        const stats: Record<string, number> = { ...this.stats };
        for (const [text, count] of Object.entries(this.stats)) {
            const instruction = instructions[text];
            if (instruction) {
                const a = text[0] + instruction;
                const b = instruction + text[1];
                stats[text] = stats[text] - count;
                stats[a] = (stats[a] ?? 0) + count;
                stats[b] = (stats[b] ?? 0) + count;
            }
        }
        return new Template2(this.first, stats);
    }

    get score(): number {
        const stats = Object.entries(this.stats).reduce((acc, [text, count]) => {
            const char = text[1];
            acc[char] = (acc[char] ?? 0) + count;
            return acc;
        }, {} as Record<string, number>);
        stats[this.first] = (stats[this.first] ?? 0) + 1;
        const counts = Object.values(stats);
        return _.max(counts)! - _.min(counts)!;
    }
}
