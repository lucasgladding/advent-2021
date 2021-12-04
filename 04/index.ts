import _ from 'lodash';
import {read} from '../helpers';

type GameInput = string[][]

type BoardInput = string[];

export function parse(name: string) {
    const contents = read(name);
    return contents.split('\n\n').map(item => item.trim().split(/[,\s]+/));
}

class Cell {
    constructor(public number: string, public isSelected = false) { }

    select() {
        this.isSelected = true;
    }
}

export class Board {
    static load(input: BoardInput): Board {
        return new Board(input.map(number => new Cell(number)));
    }

    constructor(private cells: Cell[]) { }

    select(subject: string) {
        this.cells.forEach(cell => {
            if (cell.number === subject) {
                cell.select();
            }
        });
    }

    get won(): boolean {
        const rows = _.chunk(this.cells, 5);
        const cols = _.zip(...rows);
        return rows.some(item => item.every(item => item.isSelected)) ||
               cols.some(item => item.every(item => item!.isSelected));
    }

    get score(): number {
        if (!this.won) return 0;
        const inputs = this.cells.filter(item => !item.isSelected).map(item => parseInt(item.number));
        return _.sum(inputs);
    }
}

export class Game {
    static load(input: GameInput): Game {
        const drawn = _.head(input)!;
        const boards = _.tail(input).map(item => Board.load(item));
        return new Game(drawn, boards);
    }

    constructor(private drawn: string[], private boards: Board[], public step: number = 0) { }

    next() {
        const subject = this.drawn[this.step];
        this.boards.some(board => {
            board.select(subject);
        });
        this.step++;
    }

    get winner(): Board | undefined {
        return this.boards.find(board => board.won);
    }

    get remaining(): Board[] {
        return this.boards.filter(board => !board.won);
    }

    get latest(): number {
        return parseInt(this.drawn[this.step - 1])
    }
}
