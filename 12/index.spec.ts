import {Graph, parse} from './index';

describe('12', () => {
    it('finds part 1 example', () => {
        const input = parse('12/example.txt');
        const graph = new Graph(input);
        graph.expand();
        console.log('done');
    });
});
