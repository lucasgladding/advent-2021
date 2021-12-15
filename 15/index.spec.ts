import {Grid, parse, Path} from './index';

describe('15', () => {
    it('finds part 1 example', () => {
        const input = parse('15/example.txt');
        const grid = new Grid(input);
        const path = new Path(grid);
        const origin = path.origin();
        path.expand(origin);
        expect(path.total).toEqual(40);
    });
});
