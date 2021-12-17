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

    it('decodes part 1', () => {
        const input = decode('2056FA18025A00A4F52AB13FAB6CDA779E1B2012DB003301006A35C7D882200C43289F07A5A192D200C1BC011969BA4A485E63D8FE4CC80480C00D500010F8991E23A8803104A3C425967260020E551DC01D98B5FEF33D5C044C0928053296CDAFCB8D4BDAA611F256DE7B945220080244BE59EE7D0A5D0E6545C0268A7126564732552F003194400B10031C00C002819C00B50034400A70039C009401A114009201500C00B00100D00354300254008200609000D39BB5868C01E9A649C5D9C4A8CC6016CC9B4229F3399629A0C3005E797A5040C016A00DD40010B8E508615000213112294749B8D67EC45F63A980233D8BCF1DC44FAC017914993D42C9000282CB9D4A776233B4BF361F2F9F6659CE5764EB9A3E9007ED3B7B6896C0159F9D1EE76B3FFEF4B8FCF3B88019316E51DA181802B400A8CFCC127E60935D7B10078C01F8B50B20E1803D1FA21C6F300661AC678946008C918E002A72A0F27D82DB802B239A63BAEEA9C6395D98A001A9234EA620026D1AE5CA60A900A4B335A4F815C01A800021B1AE2E4441006A0A47686AE01449CB5534929FF567B9587C6A214C6212ACBF53F9A8E7D3CFF0B136FD061401091719BC5330E5474000D887B24162013CC7EDDCDD8E5E77E53AF128B1276D0F980292DA0CD004A7798EEEC672A7A6008C953F8BD7F781ED00395317AF0726E3402100625F3D9CB18B546E2FC9C65D1C20020E4C36460392F7683004A77DB3DB00527B5A85E06F253442014A00010A8F9106108002190B61E4750004262BC7587E801674EB0CCF1025716A054AD47080467A00B864AD2D4B193E92B4B52C64F27BFB05200C165A38DDF8D5A009C9C2463030802879EB55AB8010396069C413005FC01098EDD0A63B742852402B74DF7FDFE8368037700043E2FC2C8CA00087C518990C0C015C00542726C13936392A4633D8F1802532E5801E84FDF34FCA1487D367EF9A7E50A43E90');
        const packet = create(input) as Operator;
        expect(packet.sum).toEqual(917);
    });
});
