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