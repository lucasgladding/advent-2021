import {Page, parse, Point} from './index';

describe('13', () => {
    it('runs', () => {
        const input = parse('13/example.txt');
        const points = Point.collect(input[0]);
        const page = new Page(points);
        console.log(page.debug());
    });
});
