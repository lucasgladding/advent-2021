import {Heightmap, parse} from './index';

describe('09', () => {
    it('calculates part 1 example', () => {
        const input = parse('09/example.txt');
        const heightmap = new Heightmap(input);
        expect(heightmap.level).toEqual(15);
    });

    it('calculates part 1', () => {
        const input = parse('09/input.txt');
        const heightmap = new Heightmap(input);
        expect(heightmap.level).toEqual(566);
    });

    it('calculates part 2 example', () => {
        const input = parse('09/example.txt');
        const heightmap = new Heightmap(input);
        expect(heightmap.product).toEqual(1134);
    });

    it('calculates part 2', () => {
        const input = parse('09/input.txt');
        const heightmap = new Heightmap(input);
        expect(heightmap.product).toEqual(891684);
    });
});
