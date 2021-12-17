import _ from 'lodash';

const CHARS: Record<string, string> = {
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

const LENGTHS: number[] = [15, 11];

export function decode(input: string): string {
    return input.split('').map(char => {
        return CHARS[char];
    }).join('');
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

    get data(): number {
        return 0;
    }

    get size(): number {
        return 0;
    }

    get sum(): number {
        return 0;
    }
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

    get sum(): number {
        return this.version;
    }
}

export class Operator extends Packet {
    subpackets: Packet[];

    constructor(text: string) {
        super(text);

        const type = this.content[0];
        this.subpackets = type === '0' ? this.generateSubpacketsLength() : this.generateSubpacketsCount();
    }

    private generateSubpacketsLength(): Packet[] {
        const subpackets: Packet[] = [];
        let position = 1 + this.lengthLength;
        const length = position + this.subpacketsLength;
        while (position < length) {
            const content = this.content.slice(position);
            const packet = create(content);
            subpackets.push(packet);
            position += packet.size;
        }
        return subpackets;
    }

    private generateSubpacketsCount(): Packet[] {
        const subpackets: Packet[] = [];
        let position = 1 + this.lengthLength;
        let i = 0;
        const count = this.subpacketsLength;
        while (i < count) {
            const content = this.content.slice(position);
            const packet = create(content);
            subpackets.push(packet);
            position += packet.size;
            i++;
        }
        return subpackets;
    }

    get data(): number {
        const inputs = this.subpackets.map(item => item.data);
        switch (this.type) {
            case 0:
                return _.sum(inputs);
            case 1:
                return inputs.reduce((acc, item) => acc * item, 1);
            case 2:
                return _.min(inputs)!;
            case 3:
                return _.max(inputs)!;
            case 5:
                return inputs[0] > inputs[1] ? 1 : 0;
            case 6:
                return inputs[0] < inputs[1] ? 1 : 0;
            case 7:
                return inputs[0] === inputs[1] ? 1 : 0;
        }
        return 0;
    }

    get size(): number {
        const length = _.sumBy(this.subpackets, item => item.size);
        return 3 + 3 + 1 + this.lengthLength + length;
    }

    get lengthLength(): number {
        const type = parseInt(this.content[0]);
        return LENGTHS[type];
    }

    get subpacketsLength(): number {
        const length = this.lengthLength;
        return parseInt(this.content.slice(1, length + 1), 2);
    }

    get sum(): number {
        const sum = _.sumBy(this.subpackets, item => item.sum);
        return this.version + sum;
    }
}

export function create(text: string): Packet {
    const type = parseInt(text.slice(3, 6), 2);
    return type === 4 ? new Literal(text) : new Operator(text);
}
