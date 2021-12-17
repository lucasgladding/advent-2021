import {create, decode, Literal, Operator} from './index';

describe('16', () => {
    it('decodes example 1', () => {
        const input = decode('D2FE28');
        const packet = create(input) as Literal;
        expect(packet.data).toEqual(2021);
    });

    it('decodes example 2', () => {
        const input = decode('38006F45291200');
        const packet = create(input) as Operator;
        const subpackets = packet.subpackets as Literal[];
        const points = subpackets.map(item => item.data);
        expect(points).toEqual([10, 20]);
    });

    it('decodes example 3', () => {
        const input = decode('EE00D40C823060');
        const packet = create(input) as Operator;
        const subpackets = packet.subpackets as Literal[];
        const points = subpackets.map(item => item.data);
        expect(points).toEqual([1, 2, 3]);
    });

    it('decodes example 4', () => {
        const input = decode('8A004A801A8002F478');
        const packet = create(input) as Operator;
        expect(packet.sum).toEqual(16);
    });

    it('decodes example 5', () => {
        const input = decode('620080001611562C8802118E34');
        const packet = create(input) as Operator;
        expect(packet.sum).toEqual(12);
    });

    it('decodes example 6', () => {
        const input = decode('C0015000016115A2E0802F182340');
        const packet = create(input) as Operator;
        expect(packet.sum).toEqual(23);
    });

    it('decodes example 7', () => {
        const input = decode('A0016C880162017C3686B18A3D4780');
        const packet = create(input) as Operator;
        expect(packet.sum).toEqual(31);
    });
});
