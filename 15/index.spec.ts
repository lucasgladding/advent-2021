import {Grid, parse, Route} from './index';

describe('15', () => {
    it('finds part 1 example', () => {
        const input = parse('15/example.txt');
        const grid = new Grid(input);
        const origin = grid.point([0, 0])!;
        const destination = grid.point([9, 9])!;
        const route = new Route(grid);
        const match = route.lowest(origin, destination);
        expect(match.total).toEqual(40);
    });
});
