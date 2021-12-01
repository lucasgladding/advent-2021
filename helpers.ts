import path from 'path';
import { readFileSync } from 'fs';

export function read(name: string): string {
    const contents = readFileSync(path.resolve(__dirname, name));
    return contents.toString();
}
