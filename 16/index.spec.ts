import {decode, Packet} from './index';

describe('16', () => {
    it('decodes example 1', () => {
        const input = decode('D2FE28');
        const packet = new Packet(input);
        expect(packet.data).toEqual(2021);
    });
});
