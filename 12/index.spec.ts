import {Graph, parse} from './index';

describe('12', () => {
    it('finds part 1 example 1', () => {
        const input = parse('12/example-1.txt');
        const graph = new Graph(input);
        expect(graph.paths.length).toEqual(10);
    });

    it('finds part 1 example 2', () => {
        const input = parse('12/example-2.txt');
        const graph = new Graph(input);
        expect(graph.paths.length).toEqual(19);
    });

    it('finds part 1 example 3', () => {
        const input = parse('12/example-3.txt');
        const graph = new Graph(input);
        expect(graph.paths.length).toEqual(226);
    });

    it('finds part 1', () => {
        const input = parse('12/input.txt');
        const graph = new Graph(input);
        expect(graph.paths.length).toEqual(4411);
    });
});
