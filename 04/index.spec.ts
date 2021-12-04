import {Board, Game, parse} from './index';

describe('04', () => {
    it('runs part 1 example', () => {
        const input = parse('04/example.txt');
        const game = Game.load(input);
        for (let i = 0; i < 25; i++) {
            game.next();
            if (game.winner) break;
        }
        expect(game.winner!.score * game.latest).toEqual(4512);
    });

    it('runs part 1', () => {
        const input = parse('04/input.txt');
        const game = Game.load(input);
        for (let i = 0; i < 100; i++) {
            game.next();
            if (game.winner) break;
        }
        expect(game.winner!.score * game.latest).toEqual(46920);
    });

    it('runs part 2 example', () => {
        const input = parse('04/example.txt');
        const game = Game.load(input);
        let last: Board | undefined = undefined;
        for (let i = 0; i < 25; i++) {
            game.next();
            if (!last && game.remaining.length === 1) {
                last = game.remaining[0];
            }
            if (last && last.won) {
                break;
            }
        }
        expect(last!.score * game.latest).toEqual(1924);
    });

    it('runs part 2', () => {
        const input = parse('04/input.txt');
        const game = Game.load(input);
        let last: Board | undefined = undefined;
        for (let i = 0; i < 100; i++) {
            game.next();
            if (!last && game.remaining.length === 1) {
                last = game.remaining[0];
            }
            if (last && last.won) {
                break;
            }
        }
        expect(last!.score * game.latest).toEqual(12635);
    });
});
