import {Graph, parse} from './index';

describe('12', () => {
    it('finds part 1 example 1', () => {
        const input = parse('12/example-1.txt');
        const graph = new Graph(input);
        expect(graph.paths.length).toEqual(10);
    });
});
