import {decode, Literal, Operator} from './index';

describe('16', () => {
    it('decodes example 1', () => {
        const input = decode('D2FE28');
        const packet = new Literal(input);
        expect(packet.data).toEqual(2021);
    });

    it('decodes example 2', () => {
        const input = decode('38006F45291200');
        const packet = new Operator(input);
        const subpackets = packet.subpackets as Literal[];
        const points = subpackets.map(item => item.data);
        expect(points).toEqual([10, 20]);
    });
});
