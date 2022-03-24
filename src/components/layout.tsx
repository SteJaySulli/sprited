import React, { EventHandler, MouseEventHandler, ReactEventHandler, SyntheticEvent, useRef, useState } from 'react';
import { getPallette16 } from '../utils/colors';
import { range } from '../utils/data';
import { ColorPallette } from './color-pallette';
import { SizeablePanel } from './SizeablePanel';

// import '../styles/_layout.scss';

export const Layout: React.FunctionComponent<{
    test?: undefined | string
}> = ({ test }) => {
    const [primaryColor, setPrimaryColor] = useState("#000000");
    const [secondaryColor, setSecondaryColor] = useState("#ffffff");
    const [opacity, setOpacity] = useState(1);
    const [pallette, setPallette] = useState(getPallette16(32));

    return <div className="layout">
        <SizeablePanel
            minSizes={[100, null]}
            maxSizes={[400, null]}
            defaultSizes={[200, null]}
            layout="horizontal"
        >
            <SizeablePanel
                minSizes={[100, 100, 100, null]}
                maxSizes={[400, 400, 400, null]}
                defaultSizes={[200, 200, 200, null]}
                layout="vertical"
            >
                <div className="preview">
                    PREVIEW
                </div>
                <div className="tools">
                    {/* {range(100).map((index: number) => <button key={index}>Button</button>)} */}
                    TOOLS
                </div>
                {/* <div className="selects">
                    <div className="select">
                        <select>
                            <option>State</option>
                        </select>
                        <button>+</button>
                        <button>-</button>
                    </div>
                    <div className="select">
                        <select>
                            <option>Direction</option>
                        </select>
                        <button>+</button>
                        <button>-</button>
                    </div>
                </div> */}
                <ColorPallette 
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                    setPrimaryColor={setPrimaryColor}
                    setSecondaryColor={setSecondaryColor}
                    pallette={pallette}
                    setPallette={setPallette}
                    opacity={opacity}
                    setOpacity={setOpacity}
                />

            </SizeablePanel>
            <div className="drawing-area">
                DRAW
            </div>
        </SizeablePanel>
        <div className="frame-bar">
            <div className="frames">
                <div className="frameset">
                    {range(25).map((index) => <div key={index}>{index + 1}</div>)}
                </div>
            </div>
        </div>
    </div>
}