import {Game, parse} from './index';

describe('04', () => {
    it('runs part 1 example', () => {
        const input = parse('04/example.txt');
        const game = Game.load(input);
        for (let i = 0; i < 25; i++) {
            const done = game.next();
            if (done) break;
        }
        expect(game.score).toEqual(4512);
    });

    it('runs part 1', () => {
        const input = parse('04/input.txt');
        const game = Game.load(input);
        for (let i = 0; i < 100; i++) {
            const done = game.next();
            if (done) break;
        }
        expect(game.score).toEqual(46920);
    });
});
