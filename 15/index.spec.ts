import {parse, Route} from './index';

describe('15', () => {
    it('finds part 1 example', () => {
        const input = parse('15/example.txt');
        const route = Route.create(input);
        expect(route.score).toEqual(40);
    });
});
