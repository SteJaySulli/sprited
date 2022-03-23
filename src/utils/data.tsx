/**
 * Produce an array of values within the given range, similar to Python's range function.
 *
 * If only x is given, a range from 0 up to but not including x is produced.
 * If x and y are given, a range from x up to but not including y is produced.
 * If step is given, the range will be incremented by step rather than 1.
 *
 * The range is returned as an array.
 *
 * @param x
 * @param y
 * @param step
 * @returns array
 */
export const range = (x: number, y?: undefined | number, step?: undefined | number) => {
    if(x === y) {
        return [];
    }
    if(typeof step == "undefined") {
        step = 1;
    } else {
        step = Math.abs(step);
    }
    const hasY = !(typeof y == "undefined");
    if(hasY && y < x) {
        step *= -1;
    }
    let n = hasY ? x : 0;
    return (new Array( hasY ? Math.abs(y-x) : x)).fill(0).map( () => {
        const m = n;
        n += step;
        return m;
    })
}
