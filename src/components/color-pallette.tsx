import React, { PropsWithoutRef, useState } from "react";
import { colorStringToRgb, changeColorStringHsl, changeColorStringRgb, colorStringToHsl, changeColorStringHsv, hslTohsv, hsvToHsl, colorStringToHsv, getPallette16, getPallette32, decToHexByte } from "../utils/colors";
import { Modal } from "./modal";

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
    const [rgbMode, setRgbMode] = useState(true);

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
        <div className="color-picker">
            <div style={{ backgroundColor: color }} className="selected-color">
                <span>{color}</span>
            </div>
            <div className="color-swatches">
                {getPallette32(1024).map((c) => <div
                    onClick={() => {
                        setColor(c);
                        if (hsvMode) {
                            const hsv = colorStringToHsv(c);
                            setH(hsv.h);
                            setS(hsv.s);
                            setL(hsv.v);
                        } else {
                            const hsl = colorStringToHsl(c);
                            setH(hsl.h);
                            setS(hsl.s);
                            setL(hsl.l);
                        }
                    }}
                    className="color-swatch"
                    style={{ background: c, borderColor: c != color ? c : "white" }}
                ></div>)}
            </div>
        </div>
        <div className="color-mode-select">
            <button onClick={() => {
                setRgbMode(true);
            }} disabled={rgbMode}>RGB</button>
            <button onClick={() => {
                setHsvMode(true);
                setRgbMode(false);
                const hsv = hslTohsv({ h, s, l });
                setS(hsv.s);
                setL(hsv.v);

            }} disabled={hsvMode && !rgbMode}>HSV</button>
            <button onClick={() => {
                setHsvMode(false);
                setRgbMode(false);
                const hsl = hsvToHsl({ h, s, v: l });
                setS(hsl.s);
                setL(hsl.l);
            }} disabled={!hsvMode && !rgbMode}>HSL</button>
        </div>

        {rgbMode && <>
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
        </>}
        {!rgbMode && <>
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
        </>}


    </Modal>
}

export const ColorPallette: React.FunctionComponent<PropsWithoutRef<{
    primaryColor: string;
    setPrimaryColor: (color: string) => void;
    secondaryColor: string;
    setSecondaryColor: (color: string) => void;
    pallette: string[];
    setPallette: (pallette: string[]) => void;
    opacity: number;
    setOpacity: (opacity: number) => void;
}>> = ({ primaryColor, secondaryColor, setPrimaryColor, setSecondaryColor, pallette, setPallette, opacity, setOpacity, ...props }) => {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return <>
        <div className="color-pallette">
            <div className="selectedColors">
                <div className='selectedColor' style={{ background: primaryColor + decToHexByte(opacity * 255) }}>
                    <div className="color-index">{pallette.reduce((acc: number | null, color, index) => {
                        if (color == primaryColor) {
                            acc = index;
                        }
                        return acc;
                    }, null)}</div>
                    <div className="color-rgb">
                        {primaryColor}
                    </div>
                </div>
                <div className='selectedColor' style={{ background: secondaryColor + decToHexByte(opacity * 255) }}>
                    <div className="color-index">{pallette.reduce((acc: number | null, color, index) => {
                        if (color == secondaryColor) {
                            acc = index;
                        }
                        return acc;
                    }, null)}</div>
                    <div className="color-rgb">
                        {secondaryColor}
                    </div>
                </div>
            </div>
            <input type="range" min={0} max={1} step={1 / 256} style={{ width: "100%" }} value={opacity} onChange={(event) => setOpacity(parseFloat(event.target.value))} />
            {pallette.map((col, index) => <div
                key={index}
                style={{ background: col + decToHexByte(opacity * 255) }}
                className={(primaryColor == col ? 'primarySelected ' : '') + (secondaryColor == col ? 'secondarySelected' : '')}
                onClick={() => setPrimaryColor(col)}
                onContextMenu={() => setSecondaryColor(col)}
                onDoubleClick={() => {
                    setPrimaryColor(col);
                    setShowModal(true);
                }}
            ><span>{index}</span></div>)}
        </div>
        <button
            onClick={() => {
                if (!pallette.includes("")) {
                    setPallette([...pallette, ""]);
                }
                setPrimaryColor("");
                setShowModal(true);

            }}
        >Add Colour</button>
        <button
            onClick={() => {
                if(primaryColor == "") {
                    setPallette(pallette.filter(c => c != primaryColor));
                } else if (primaryColor != "#000000") {
                    setShowDeleteModal(true);
                }  
                
            }}
        >Remove Colour</button>
        <SelectColourModal
            title="Change Colour"
            show={showModal}
            color={primaryColor}
            onChange={(color) => {
                if (!pallette.includes(color)) {
                    setPallette(pallette.map((c) => {
                        if (c == primaryColor) {
                            return color;
                        } else {
                            return c;
                        }
                    }))
                }
                setPrimaryColor(color);
            }}
            onClose={() => setShowModal(false)}
        />
        <Modal
            title="Delete Colour?"
            show={showDeleteModal}
            onCancel={() => setShowDeleteModal(false)}
            onOK={() => {
                setPallette(pallette.filter(c => c != primaryColor));
                setShowDeleteModal(false);
            }}
        >
            <p>Are you sure you want to delete this colour from the pallette?</p>
            <div style={{
                width: "100%",
                height: "32px",
                lineHeight: "32px",
                textAlign: "center",
                textShadow: "0px 0px 8px black",
                color: "white",
                backgroundColor: primaryColor
            }}>
                {primaryColor}
            </div>
        </Modal>

    </>
}