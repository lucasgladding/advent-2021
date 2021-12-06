import {parse} from './index';

describe('06', () => {
    it('runs part 1 example', () => {
        const input = parse('06/example.txt');
        for (let i = 0; i < 80; i++) {
            input.run();
        }
        expect(input.size).toEqual(5934);
    });

    it('runs part 1', () => {
        const input = parse('06/input.txt');
        for (let i = 0; i < 80; i++) {
            input.run();
        }
        expect(input.size).toEqual(350149);
    });
});
