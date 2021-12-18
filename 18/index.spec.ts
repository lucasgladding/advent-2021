import {add, can_explode, explode, search, trim} from './index';

describe('18', () => {
    it('runs', () => {
        const root = add([[[[4,3],4],4],[7,[[8,4],9]]],[1,1]);
        for (let i = 0; i < 10; i++) {
            const path = search(root, can_explode);
            if (path)
                explode(root, path);
        }
        console.log('done');
    });

    it('trims', () => {
        expect(trim([0, 0, 1, 1, 0, 0], 1)).toEqual([0, 0, 1, 1]);
    });
});
