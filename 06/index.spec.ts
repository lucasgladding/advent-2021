import {loop2, parse1, parse2} from './index';

describe('06', () => {
    it('runs part 1 example', () => {
        const input = parse1('06/example.txt');
        input.loop(80);
        expect(input.size).toEqual(5934);
    });

    it('runs part 1', () => {
        const input = parse1('06/input.txt');
        input.loop(80);
        expect(input.size).toEqual(350149);
    });

    it('runs part 2 example', () => {
        const input = parse2('06/example.txt');
        const count = loop2(input, 256);
        expect(count).toEqual(26984457539);
    });

    it('runs part 2', () => {
        const input = parse2('06/input.txt');
        const count = loop2(input, 256);
        expect(count).toEqual(1590327954513);
    });
});
