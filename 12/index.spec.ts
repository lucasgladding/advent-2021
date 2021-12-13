import {Graph1, Graph2, parse} from './index';

describe('12', () => {
    it('finds part 1 example 1', async () => {
        const input = parse('12/example-1.txt');
        const graph = new Graph1(input);
        expect(graph.paths.length).toEqual(10);
    });

    it('finds part 1 example 2', async () => {
        const input = parse('12/example-2.txt');
        const graph = new Graph1(input);
        expect(graph.paths.length).toEqual(19);
    });

    it('finds part 1 example 3', () => {
        const input = parse('12/example-3.txt');
        const graph = new Graph1(input);
        expect(graph.paths.length).toEqual(226);
    });

    it('finds part 1', () => {
        const input = parse('12/input.txt');
        const graph = new Graph1(input);
        expect(graph.paths.length).toEqual(4411);
    });

    it('finds part 2 example 1', async () => {
        const input = parse('12/example-1.txt');
        const graph = new Graph2(input);
        expect(graph.paths.length).toEqual(36);
    });

    it('finds part 2 example 2', async () => {
        const input = parse('12/example-2.txt');
        const graph = new Graph2(input);
        expect(graph.paths.length).toEqual(103);
    });

    it('finds part 2 example 3', async () => {
        const input = parse('12/example-3.txt');
        const graph = new Graph2(input);
        expect(graph.paths.length).toEqual(3509);
    });

    it('finds part 2', async () => {
        const input = parse('12/input.txt');
        const graph = new Graph2(input);
        expect(graph.paths.length).toEqual(136767);
    });
});
