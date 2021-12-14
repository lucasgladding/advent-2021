import _ from 'lodash';
import {read} from '../helpers';

type Instruction = [string, string];

export function parse(name: string): [string, Instruction[]] {
    const contents = read(name);
    const sections = contents.split('\n\n');
    const base = sections[0];
    const instructions = sections[1].split('\n').map(item => item.split(' -> ') as Instruction);
    return [base, instructions];
}

export class Template {
    static groups(groups: string[]): Template {
        let input = groups[0][0];
        for (const group of groups) {
            input += group.slice(1);
        }
        return new Template(input);
    }

    constructor(private input: string) { }

    private get groups(): string[] {
        const output: string[] = [];
        for (let i = 1; i < this.input.length; i++) {
            output.push(this.input[i - 1] + this.input[i]);
        }
        return output;
    }

    process(instructions: Instruction[], steps: number): Template {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let current: Template = this;
        for (let i = 0; i < steps; i++) {
            current = current.insert(instructions);
        }
        return current;
    }

    private insert(instructions: Instruction[]): Template {
        const groups = this.groups.map(group => {
            const instruction = this.find(group, instructions);
            if (instruction) {
                return group[0] + instruction[1] + group[1];
            }
            return group;
        });
        return Template.groups(groups);
    }

    private find(group: string, instructions: Instruction[]) {
        return instructions.find(i => i[0] === group);
    }

    get score(): number {
        const counts = _.countBy(this.input.split(''));
        const most = _.maxBy(Object.entries(counts), item => item[1])![1];
        const least = _.minBy(Object.entries(counts), item => item[1])![1];
        return most - least;
    }
}
