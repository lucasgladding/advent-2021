import _ from 'lodash';

interface Locationable {
    x: number;
    y: number;
}

export class Probe implements Locationable {
    private changeX = 0;
    private changeY = 0;

    constructor(public x = 0, public y = 0) { }

    launch(x: number, y: number) {
        this.changeX = x;
        this.changeY = y;
    }

    next() {
        this.x += this.changeX;
        this.y += this.changeY;
        this.changeX = this.increment(this.changeX);
        this.changeY -= 1;
    }

    private increment(input: number): number {
        if (input === 0)
            return 0;
        return input > 0 ? input - 1 : input + 1;
    }

    get position(): Locationable {
        return { x: this.x, y: this.y };
    }
}

export class Range {
    constructor(public min: number, public max: number) { }

    contains(location: number) {
        return location >= this.min && location <= this.max;
    }

    lt(location: number): boolean {
        return location < this.min;
    }

    gt(location: number): boolean {
        return location > this.max;
    }
}

export class Target {
    constructor(public rangeX: Range, public rangeY: Range) { }

    contains(object: Locationable): boolean {
        return this.rangeX.contains(object.x) && this.rangeY.contains(object.y);
    }

    miss(object: Locationable): boolean {
        return this.rangeX.gt(object.x) || this.rangeY.lt(object.y);
    }
}

export class Launch {
    positions: Locationable[];
    changeX = 0;
    changeY = 0;

    constructor(private probe: Probe, private target: Target) {
        this.positions = [this.probe.position];
    }

    launch(changeX: number, changeY: number): boolean {
        this.changeX = changeX;
        this.changeY = changeY;
        this.probe.launch(changeX, changeY);
        while (!this.target.miss(this.probe)) {
            this.probe.next();
            this.positions.push(this.probe.position);
            const success = this.target.contains(this.probe);
            if (success)
                return true;
        }
        return false;
    }

    get height(): number {
        const max = _.maxBy(this.positions, item => item.y)!;
        return max.y;
    }
}

export function height(target: Target): number {
    const launches = successes(target);
    const heights = launches.map(item => item.height);
    return _.max(heights)!;
}

export function successes(target: Target): Launch[] {
    const successes: Launch[] = [];
    for (let x = 0; x <= target.rangeX.max; x++) {
        for (let y = target.rangeY.min; y <= target.rangeX.max; y++) {
            const probe = new Probe(0, 0);
            const launch = new Launch(probe, target);
            const success = launch.launch(x, y);
            if (success)
                successes.push(launch);
        }
    }
    return successes;
}
