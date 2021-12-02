import {read} from '../helpers';

type Command = [string, number];

type Location = {
    position: number;
    depth: number;
};

function parse(name: string): Command[] {
    const contents = read(name);
    return contents.split('\n').map(text => {
        const components = text.split(' ');
        return [components[0], parseInt(components[1])];
    });
}

export function navigate1(name: string): Location {
    let position = 0;
    let depth = 0;
    const commands = parse(name);
    for (let command of commands) {
        switch (command[0]) {
            case 'forward':
                position += command[1];
                break;
            case 'down':
                depth += command[1];
                break;
            case 'up':
                depth -= command[1];
                break;
        }
    }
    return { position, depth };
}