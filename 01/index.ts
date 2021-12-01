import path from 'path';
import {read} from '../helpers';

export function main() {
    const contents = read(path.resolve(__dirname, './example.txt'))
    const lines = contents.split('\n').map(text => parseInt(text));
    let count = -1;
    let previous: number = 0;
    for (let measurement of lines) {
        if (measurement > previous) {
            count++;
        }
        previous = measurement;
    }
    return count;
}
