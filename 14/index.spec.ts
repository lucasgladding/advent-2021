import {parse, Template} from './index';

describe('14', () => {
    it('runs part 1 example', () => {
        const input = parse('14/example.txt');
        let template = new Template(input[0]);
        template = template.process(input[1], 10);
        expect(template.score).toEqual(1588);
    });

    it('runs part 1', () => {
        const input = parse('14/input.txt');
        let template = new Template(input[0]);
        template = template.process(input[1], 10);
        expect(template.score).toEqual(3408);
    });

    xit('runs part 2', () => {
        const input = parse('14/input.txt');
        let template = new Template(input[0]);
        template = template.process(input[1], 40);
        expect(template.score).toEqual(0);
    });
});
