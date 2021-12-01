import {read} from '../helpers';

export function calculate1(name: string): number {
    const contents = read(name)
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

export function calculate2(name: string): number {
    const contents = read(name)
    const lines = contents.split('\n').map(text => parseInt(text));
    const tacos = lines.map((measurement, index) => {
        if (index < 2) return 0;
        return lines[index] + lines[index - 1] + lines[index - 2];
    });
    let count = -1;
    let previous: number = 0;
    for (let measurement of tacos) {
        if (measurement > previous) {
            count++;
        }
        previous = measurement;
    }
    return count;
}
