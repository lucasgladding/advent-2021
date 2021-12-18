import {evaluate, parse} from './index';

describe('18', () => {
    it('runs', () => {
        const input = parse('[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]');
        evaluate(input);
        console.log('done');
    });
});
