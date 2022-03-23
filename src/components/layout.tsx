import React, { EventHandler, MouseEventHandler, ReactEventHandler, SyntheticEvent, useRef, useState } from 'react';
import { range } from '../utils/data';
import { ColorPallette } from './color-pallette';
import { SizeablePanel } from './SizeablePanel';

// import '../styles/_layout.scss';

export const Layout: React.FunctionComponent<{
    test?: undefined | string
}> = ({ test }) => {
    const [primaryColor, setPrimaryColor] = useState("#000000");
    const [secondaryColor, setSecondaryColor] = useState("#000000");
    
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
                <ColorPallette 
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                    setPrimaryColor={setPrimaryColor}
                    setSecondaryColor={setSecondaryColor}
                />
                <div className="selects">
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
                </div>

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
    /*
    return <div className={"layout" + (mouseX > 0 ? ' dragging-horizontal' : '') + (mouseY > 0 ? ' dragging-vertical' : '')}>
        <div className="main">
            <div className="tool-box" style={{ width: `${toolboxWidth}px` }}>
                <div className="preview">

                </div>
                <div className="tools" style={{ height: `${toolboxHeight}px` }}>
                    {range(100).map((index: number) => <button key={index}>Button</button>)}
                </div>
                <div className="drag-bar-vertical"
                    onMouseDown={(event) => {
                        setMouseY(event.clientY);
                        window.addEventListener('mousemove', dragingToolboxVertically);
                    }}
                    onMouseUp={(event) => {
                        setMouseY(0);
                        window.removeEventListener('mousemove', dragingToolboxVertically);
                    }}
                ></div>
                <ColorPallette color={color} setColor={setColor}></ColorPallette>
                <div className="selects">
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
                </div>

            </div>
            <div className="drag-bar"
                onMouseDown={(event) => {
                    setMouseX(event.clientX);
                    window.addEventListener('mousemove', dragingToolboxHorizontally);
                }}
                onMouseUp={(event) => {
                    setMouseX(0);
                    window.removeEventListener('mousemove', dragingToolboxHorizontally);
                }}
            ></div>
            <div className="drawing-area">

            </div>
        </div>
        <div className="frame-bar">
            <div className="frames">
                <div className="frameset">
                    {range(25).map((index) => <div key={index}>{index + 1}</div>)}
                </div>
            </div>
        </div>
    </div>
    */
}