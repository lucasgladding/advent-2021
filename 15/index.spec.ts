import {parse, Grid, sum, Grid2} from './index';

describe('15', () => {
    it('finds part 1 example', () => {
        const input = parse('15/example-1.txt');
        const grid = new Grid(input);
        const from = grid.get(0, 0)!;
        const to = grid.get(9, 9)!;
        const path = grid.path(from, to);
        const total = sum(path);
        expect(total).toEqual(40);
    });

    it('finds part 1', () => {
        const input = parse('15/input.txt');
        const grid = new Grid(input);
        const from = grid.get(0, 0)!;
        const to = grid.get(99, 99)!;
        const path = grid.path(from, to);
        const total = sum(path);
        expect(total).toEqual(589);
    });

    it('finds part 2 example', () => {
        const input = parse('15/example-2.txt');
        const grid = new Grid2(input);
        const from = grid.get(0, 0)!;
        const to = grid.get(49, 49)!;
        const path = grid.path(from, to);
        const total = sum(path);
        expect(total).toEqual(315);
    });
});
