import { readFileSync } from 'fs';

export function read(path: string): string {
    const contents = readFileSync(path);
    return contents.toString();
}
