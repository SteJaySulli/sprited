import { PropsWithChildren, ReactNode, FunctionComponent, useRef, useState, useEffect } from "react"

export const SizeablePanel: FunctionComponent<PropsWithChildren<{
    layout: "vertical" | 'horizontal';
    defaultSizes: number[];
    minSizes: number[];
    maxSizes: number[];
}>> = ({ children, layout, defaultSizes, minSizes, maxSizes, ...props }) => {
    const sizes = children instanceof Array ? children.map((child, index) => useState(defaultSizes[index])) : [];
    const [mouse, setMouse] = useState(0);
    
    const setupFn = (which:number) => {
        return (event: MouseEvent) => {
                if (event.buttons != 1) {
                    setMouse(0);
                    window.removeEventListener('mousemove', draggingHandle);
                } else {
                    const client: number = layout == "vertical" ? event.clientY : event.clientX;
                    if (client > 0) {
                        let size = client - mouse - sizes.reduce( (acc, [val, fn], index) => {
                            if(index < which) {
                                acc += val;
                            }
                            return acc;
                        }, 0);
                        
                        sizes.map(([s, set], index) => {
                            const diff = (sizes[which][0] - size) * (index == which ? -1 : 1);
                            if(index == which || ( index == which + 1 && index < sizes.length - 2 )) {
                                set( s + diff <= minSizes[index] ? minSizes[index] : ( s + diff >= maxSizes[index] ? maxSizes[index] : s + diff))
                            }
                        });
                    }
                    setMouse(client);
                }
            };
    }

    let draggingHandle = setupFn(0);

    return <div className={`sizeable-panel sizeable-panel-${layout} ${mouse > 0 ? 'dragging' : ''}`}>
        {children instanceof Array ? children.map((child: ReactNode, index: number) => (
            index < children.length - 1 ? <>
                <div
                    key={`panel-${index}`}
                    className="sizeable-panel-section"
                    style={layout == "vertical" ? {
                        height: `${sizes[index][0]}px`,
                    } : {
                        width: `${sizes[index][0]}px`,
                    }}
                >
                    {child}
                </div>
                <div
                key={`handle-${index}`}
                    className="sizeable-panel-drag-bar"
                    onMouseDown={(event) => {
                        draggingHandle = setupFn(index);
                        setMouse(layout == "vertical" ? event.clientY : event.clientX);
                        window.addEventListener('mousemove', draggingHandle);
                    }}
                    onMouseUp={() => {
                        setMouse(0);
                        window.removeEventListener('mousemove', draggingHandle);
                    }}
                />
            </> : <div key={`panel-${index}`} className="sizeable-panel-section">{child}</div>))
            : <div className="sizeable-panel-section">{children}</div>}
    </div>
}