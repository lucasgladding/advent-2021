import _ from 'lodash';

const chars: Record<string, string> = {
    '0': '0000',
    '1': '0001',
    '2': '0010',
    '3': '0011',
    '4': '0100',
    '5': '0101',
    '6': '0110',
    '7': '0111',
    '8': '1000',
    '9': '1001',
    'A': '1010',
    'B': '1011',
    'C': '1100',
    'D': '1101',
    'E': '1110',
    'F': '1111',
};

const lengths: number[] = [15, 11];

export function decode(input: string): string {
    return input.split('').map(char => {
        return chars[char];
    }).join('');
}

function decodeLiteral(input: string): string {
    let done = false;
    let output = '';
    let position = 0;
    while (!done) {
        done = input[position] === '0';
        output += input.slice(position + 1, position + 5);
        position += 5;
    }
    return output;
}

function decodeOperator(input: string) {
    const output: string[] = [];
    let position = 0;

    const type = parseInt(input[0]);
    const length = lengths[type];
    position += 1;

    const bits = parseInt(input.slice(position, position + length), 2);
    position += length;

    const content = input.slice(position, position + bits);
    position += bits;

    return output;
}

export class Packet {
    version: number;
    type: number;
    content: string;

    constructor(text: string) {
        this.version = parseInt(text.slice(0, 3), 2);
        this.type = parseInt(text.slice(3, 6), 2);
        this.content = text.slice(6);
    }

    get size(): number {
        throw new Error('Implement through concrete subclasses');
    }
}

function snap(input: number): number {
    return Math.ceil(input / 4) * 4;
}

export class Literal extends Packet {
    get data(): number {
        return parseInt(this.text, 2);
    }

    get size(): number {
        const length = this.text.length / 4 * 5;
        return 3 + 3 + length;
    }

    private get text(): string {
        let done = false;
        let output = '';
        let position = 0;
        while (!done) {
            done = this.content[position] === '0';
            output += this.content.slice(position + 1, position + 5);
            position += 5;
        }
        return output;
    }
}

export class Operator extends Packet {
    get subpackets(): Packet[] {
        const subpackets: Packet[] = [];
        let position = 1 + this.lengthLength;
        const length = position + this.subpacketsLength;
        while (position < length) {
            const content = this.content.slice(position);
            const packet = new Literal(content);
            subpackets.push(packet);
            position += packet.size;
        }
        return subpackets;
    }

    get lengthLength(): number {
        const type = parseInt(this.content[0]);
        return lengths[type];
    }

    get subpacketsLength(): number {
        const length = this.lengthLength;
        return parseInt(this.content.slice(1, length + 1), 2);
    }
}
