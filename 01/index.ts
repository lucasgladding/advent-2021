import {read} from '../helpers';

function parse(name: string): number[] {
    const contents = read(name)
    return contents.split('\n').map(text => parseInt(text));
}

export function calculate1(name: string): number {
    let count = -1;
    let previous = 0;
    const measurements = parse(name);
    for (const measurement of measurements) {
        if (measurement > previous) {
            count++;
        }
        previous = measurement;
    }
    return count;
}

export function calculate2(name: string): number {
    let count = -1;
    let previous = 0;
    const measurements = parse(name);
    const sums = measurements.map((measurement, index) => {
        if (index < 2) {
            return 0;
        }
        return measurements[index] + measurements[index - 1] + measurements[index - 2];
    });
    for (const measurement of sums) {
        if (measurement > previous) {
            count++;
        }
        previous = measurement;
    }
    return count;
}
