type rgb = {
    r: number,
    g: number,
    b: number
};

type hsl = {
    h: number,
    s: number,
    l: number
}

type hsv = {
    h: number,
    s: number,
    v: number
}

export const rgb = (r: number, g: number, b: number): rgb => {
    return {
        r,
        g,
        b
    };
}

export const hsl = (h: number, s: number, l: number): hsl => {
    return {
        h,
        s,
        l
    };
}

export const rgbToArray = (rgb: rgb): number[] => {
    return [rgb.r, rgb.g, rgb.b];
}

export const hsvToArray = (hsl: hsl): number[] => {
    return [hsl.h, hsl.s, hsl.l];
}

export function decToHexByte(decimal: number): string {
    var code = Math.round(decimal).toString(16);

    (code.length > 1) || (code = '0' + code);
    return code;
}

export function hexByteToDec(hex: string): number {
    return parseInt(hex, 16);
}

export const rgbToColorString = (rgb: rgb): string => {
    const { r, g, b } = rgb;
    return "#" + decToHexByte(r) + decToHexByte(g) + decToHexByte(b)
}

export const hslToColorString = (hsl: hsl): string => {
    const rgb = hslToRgb(hsl);
    return rgbToColorString(rgb);

}

export const colorStringToRgb = (color: string): rgb => {
    // console.log(color,color.substring(1, 3),color.substring(3, 5) )
    return {
        r: hexByteToDec(color.substring(1, 3)),
        g: hexByteToDec(color.substring(3, 5)),
        b: hexByteToDec(color.substring(5, 7)),
    }
}

export const colorStringToHsl = (color: string): hsl => {
    return rgbToHsl(colorStringToRgb(color));
}

export const rgbToHsl = (rgb: rgb): hsl => {
    let { r, g, b } = rgb;
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h, s, l };
}

export const hslToRgb = (hsl: hsl): rgb => {
    let { h, s, l } = hsl;
    if (s == 0) {
        return {
            r: l * 255,
            g: l * 255,
            b: l * 255
        }
    }

    const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    return {
        r: hue2rgb(p, q, h + 1 / 3) * 255,
        g: hue2rgb(p, q, h) * 255,
        b: hue2rgb(p, q, h - 1 / 3) * 255
    }
}

export const changeColorStringRgb = (
    color: string,
    parameter: { r?: number, g?: number, b?: number }
) => {
    const keys = Object.keys(parameter);
    return rgbToColorString(keys.reduce((acc: rgb, key: "r" | "g" | "b") => {
        acc[key] = parameter[key];
        return acc;
    }, colorStringToRgb(color)));
}

export const changeColorStringHsl = (
    color: string,
    parameter: { h?: number, s?: number, l?: number }
) => {
    const keys = Object.keys(parameter);
    return hslToColorString(keys.reduce((acc: hsl, key: "h" | "s" | "l") => {
        acc[key] = parameter[key];
        return acc;
    }, colorStringToHsl(color)));
}

export const hslTohsv = (hsl: hsl) => {
    const h = hsl.h;
    const v = hsl.l + hsl.s * (hsl.l < 1 - hsl.l ? hsl.l : 1 - hsl.l);
    const s = v == 0 ? 0 : 2 * (1 - hsl.l / v);
    return { h, s, v };
}

export const hsvToHsl = (hsv: hsv) => {
    const h = hsv.h;
    const l = hsv.v * (1 - hsv.s / 2);
    const s = l == 0 || l == 1 ? 0 : (hsv.v - l) / (l < 1 - l ? l : 1 - l);
    return { h, s, l };
}

export const hsvToColorString = (hsv: hsv): string => {
    return hslToColorString(hsvToHsl(hsv));
}

export const colorStringToHsv = (color: string): hsv => {
    return hslTohsv(colorStringToHsl(color));
}

export const changeColorStringHsv = (color: string, parameter: { h?: number, s?: number, v?: number }) => {
    const keys = Object.keys(parameter);
    return hsvToColorString(keys.reduce((acc: hsv, key: "h" | "s" | "v") => {
        acc[key] = parameter[key];
        return acc;
    }, colorStringToHsv(color)));

}

export const generatePallette = (hues: number, variations?: undefined | number) => {
    let pallette = [];
    const hc = variations / (variations + 2);
    const lc = 1 - hc;
    const tc = hc - lc;
    let pureColors = false;
    // Start with greyscale
    for (let l = 0; l < 1; l += 1 / (hues - 1)) {
        pallette.push(hslToColorString({ h: 0, s: 0, l }));
    }
    // pallette.push(hslToColorString({ h: 0, s: 0, l: 1 }));
    for (let h = 0; h < 1; h += 1 / hues) {
        pallette.push(hslToColorString({ h, s: 1, l: 0.5 }));
    }
    if(typeof variations == "undefined" || variations < 1) {
        return pallette;
    }
    for (let l = lc; l <= hc; l += tc / variations) {
        // for (let s = lc; s <= hc; s += tc / 2) {
        for (let h = 0; h < 1; h += 1 / hues) {
            pallette.push(hslToColorString({ h, s: 0.5, l }));
            // }
        }
    }
    return pallette;
}

export const getPallette8 = (colors: number) => generatePallette(8, (colors / 8) - 2);
export const getPallette16 = (colors: number) => generatePallette(16, (colors / 16) - 2);
export const getPallette32 = (colors: number) => generatePallette(32, (colors / 32) - 2);

