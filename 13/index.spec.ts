import {Page, parse, Point} from './index';

describe('13', () => {
    it('runs part 1 example', () => {
        const input = parse('13/example.txt');
        const points = Point.collect(input[0]);
        let page = new Page(points);
        page = page.perform(input[1][0]);
        expect(page.count).toEqual(17);
    });

    it('runs part 1', () => {
        const input = parse('13/input.txt');
        const points = Point.collect(input[0]);
        let page = new Page(points);
        page = page.perform(input[1][0]);
        expect(page.count).toEqual(607);
    });
});
