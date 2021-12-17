import {height, Launch, Probe, Range, successes, Target} from './index';

describe('17', () => {
    it.each([
        [7, 2, true],
        [6, 3, true],
        [9, 0, true],
        [17, -4, false],
    ])('runs part 1 examples', (x, y, expected) => {
        const probe = new Probe(0, 0);
        const target = new Target(new Range(20, 30), new Range(-10, -5));
        const launch = new Launch(probe, target);
        const success = launch.launch(x, y);
        expect(success).toEqual(expected);
    });

    it('gets the height from the best launch', () => {
        const target = new Target(new Range(20, 30), new Range(-10, -5));
        const output = height(target);
        expect(output).toEqual(45);
    });

    it('gets part 1', () => {
        const target = new Target(new Range(209, 238), new Range(-86, -59));
        const output = height(target);
        expect(output).toEqual(3655);
    });

    it('gets the count from the example', () => {
        const target = new Target(new Range(20, 30), new Range(-10, -5));
        const output = successes(target);
        expect(output).toHaveLength(112);
    });

    it('gets part 2', () => {
        const target = new Target(new Range(209, 238), new Range(-86, -59));
        const output = successes(target);
        expect(output).toHaveLength(1447);
    });
});
