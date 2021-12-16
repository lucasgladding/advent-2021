import {parse, Grid, sum} from './index';

describe('15', () => {
    it('finds part 1 example', () => {
        const input = parse('15/example.txt');
        const grid = new Grid(input);
        const from = grid.get(0, 0)!;
        const to = grid.get(9, 9)!;
        const path = grid.path(from, to);
        const total = sum(path);
        expect(total).toEqual(40);
    });
});
