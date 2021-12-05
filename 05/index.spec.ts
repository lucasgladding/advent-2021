import {bounds, Grid, parse} from './index';

describe('05', () => {
    it('runs part 1 example', () => {
        const input = parse('05/example.txt');
        const max = bounds(input);
        const grid = new Grid(max);
        for (const line of input) {
            grid.draw(line);
        }
        expect(grid.overlaps).toEqual(5);
    });

    it('runs part 1', () => {
        const input = parse('05/input.txt');
        const max = bounds(input);
        const grid = new Grid(max);
        for (const line of input) {
            grid.draw(line);
        }
        expect(grid.overlaps).toEqual(6007);
    });
});
