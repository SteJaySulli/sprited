import React, { PropsWithoutRef, useState } from "react";
import { rgbToColorString, colorStringToRgb, changeColorStringHsl, changeColorStringRgb, colorStringToHsl, changeColorStringHsv, hslTohsv, hsvToHsl, colorStringToHsv } from "../utils/colors";
import { Modal } from "./modal";

let pallette = [
    '#000000', '#800000', '#008000', '#808000', '#000080', '#800080', '#008080', '#c0c0c0',
    '#808080', '#ff0000', '#00ff00', '#ffff00', '#0000ff', '#ff00ff', '#00ffff', '#ffffff'
];

export const addColorToPallette = (color: string) => {
    pallette.push(color);
}

export const removeColorFromPallette = (color: string) => {
    pallette = pallette.filter((c) => c != color);
}

export const SelectColourModal: React.FunctionComponent<PropsWithoutRef<{
    show: boolean;
    title?: undefined | string;
    onChange: (color: string) => void;
    onClose: () => void;
    color?: undefined | string;
}>> = ({ title, color: initial, onChange, onClose, show, ...props }) => {
    const [color, setColor] = useState(typeof initial == "undefined" ? "#000000" : initial);
    const [h, setH] = useState(typeof initial == "undefined" ? 0 : colorStringToHsl(initial).h)
    const [s, setS] = useState(typeof initial == "undefined" ? 0 : colorStringToHsl(initial).s)
    const [l, setL] = useState(typeof initial == "undefined" ? 0 : colorStringToHsv(initial).v)
    const [hsvMode, setHsvMode] = useState(true);
    return <Modal
        show={show}
        title={!!title ? title : "Select Colour"}
        onCancel={onClose}
        onOK={() => {
            onChange(color);
            onClose();
        }}
        okLabel="Set Colour"
    >
        <div style={{ minWidth: "400px", backgroundColor: color, height: "32px" }}>
            <span>{color}</span>
        </div>

        <div className="color-slider">
            <div>Red</div>
            <input
                type="range"
                min="0"
                max="255"
                step="1"
                onChange={(event) => {
                    setColor(changeColorStringRgb(color, { r: parseInt(event.target.value) }))
                    const hsl = colorStringToHsl(color);
                    if (hsl.h != 0 && hsl.s != 0) {
                        setH(hsl.h);
                        setS(hsl.s);
                    }
                    setL(hsl.l);
                }}
                value={colorStringToRgb(color).r}
            />
        </div>
        <div className="color-slider">
            <div>Green</div>
            <input
                type="range"
                min="0"
                max="255"
                step="1"
                onChange={(event) => {
                    setColor(changeColorStringRgb(color, { g: parseInt(event.target.value) }))
                    const hsl = colorStringToHsl(color);
                    if (hsl.h != 0 && hsl.s != 0) {
                        setH(hsl.h);
                        setS(hsl.s);
                    }
                    setL(hsl.l);
                }}
                value={colorStringToRgb(color).g}
            />
        </div>
        <div className="color-slider">
            <div>Blue</div>
            <input
                type="range"
                min="0"
                max="255"
                step="1"
                onChange={(event) => {
                    setColor(changeColorStringRgb(color, { b: parseInt(event.target.value) }))
                    const hsl = colorStringToHsl(color);
                    if (hsl.h != 0 && hsl.s != 0) {
                        setH(hsl.h);
                        setS(hsl.s);
                    }
                    setL(hsl.l);
                }}
                value={colorStringToRgb(color).b}
            />
        </div>
        <br />
        <div className="color-mode-select">
            <button onClick={() => {
                setHsvMode(true);
                const hsv = hslTohsv({h,s,l});
                setS(hsv.s);
                setL(hsv.v);

            }} disabled={hsvMode}>HSV</button>
            <button onClick={() => {
                setHsvMode(false)
                const hsl = hsvToHsl({h,s,v:l});
                setS(hsl.s);
                setL(hsl.l);
            }} disabled={!hsvMode}>HSV</button>
        </div>
        <div className="color-slider">
            <div>Hue</div>
            <input
                type="range"
                min="0"
                max="1529"
                step="1"
                onChange={(event) => {
                    setH(parseInt(event.target.value) / 1530)
                    if (hsvMode) {
                        setColor(changeColorStringHsv(color, { h, s, v: l }));
                    } else {
                        setColor(changeColorStringHsl(color, { h, s, l }));
                    }
                }}
                value={h * 1530}
            />
        </div>
        <div className="color-slider">
            <div>Saturation</div>
            <input
                type="range"
                min="0"
                max="16777216"
                step="1"
                onChange={(event) => {
                    setS(parseInt(event.target.value) / 16777216);
                    if (hsvMode) {
                        setColor(changeColorStringHsv(color, { h, s, v: l }));
                    } else {
                        setColor(changeColorStringHsl(color, { h, s, l }));
                    }
                }}
                value={s * 16777216}
            />
        </div>
        <div className="color-slider">
            <div>{hsvMode ? 'Value' : 'Lightness'}</div>
            <input
                type="range"
                min="0"
                max="16777216"
                step="1"
                onChange={(event) => {
                    setL(parseInt(event.target.value) / 16777216);
                    if (hsvMode) {
                        setColor(changeColorStringHsv(color, { h, s, v: l }));
                    } else {
                        setColor(changeColorStringHsl(color, { h, s, l }));
                    }
                }}
                value={l * 16777216}
            />
        </div>


    </Modal>
}

export const ColorPallette: React.FunctionComponent<PropsWithoutRef<{
    primaryColor: string;
    setPrimaryColor: (color: string) => void;
    secondaryColor: string;
    setSecondaryColor: (color: string) => void;
}>> = ({ primaryColor, secondaryColor, setPrimaryColor, setSecondaryColor, ...props }) => {
    const [showModal, setShowModal] = useState(true);

    return <>
        <div className="color-pallette">
            <div className="selectedColors">
                <div className='selectedColor' style={{ background: primaryColor }}><span>{pallette.reduce((acc: number | null, color, index) => {
                    if (color == primaryColor) {
                        acc = index;
                    }
                    return acc;
                }, null)}</span></div>
                <div className='selectedColor' style={{ background: secondaryColor }}><span>{pallette.reduce((acc: number | null, color, index) => {
                    if (color == secondaryColor) {
                        acc = index;
                    }
                    return acc;
                }, null)}</span></div>
            </div>
            {pallette.map((col, index) => <div
                key={index}
                style={{ background: col }}
                className={(primaryColor == col ? 'primarySelected ' : '') + (secondaryColor == col ? 'secondarySelected' : '')}
                onClick={() => setPrimaryColor(col)}
                onContextMenu={() => setSecondaryColor(col)}
            ><span>{index}</span></div>)}
        </div>
        <SelectColourModal
            title="Change Colour"
            show={showModal}
            onChange={() => { }}
            onClose={() => setShowModal(false)}
        />

    </>
}