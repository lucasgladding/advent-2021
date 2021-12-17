import _ from 'lodash';

const map: Record<string, string> = {
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

export function decode(input: string): string {
    return input.split('').map(char => {
        return map[char];
    }).join('');
}

function decodeLiteral(input: string): number {
    const chars = input.split('');
    const groups = _.chunk(chars, 5);
    const bits = groups.map(item => item.slice(1));
    const data = _.flatten(bits).join('');
    return parseInt(data, 2);
}

export class Packet {
    version: number;
    type: number;
    content: string;

    constructor(text: string) {
        this.version = parseInt(text.slice(0, 3), 2);
        this.type = parseInt(text.slice(3, 6), 2);
        this.content = text.slice(6).replace(/0*$/, '');
    }

    get data() {
        return decodeLiteral(this.content);
    }
}
