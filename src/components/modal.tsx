import { PropsWithChildren } from "react";

let modalZindex = 100;

export const Modal: React.FunctionComponent<PropsWithChildren<{
    show: boolean;
    title?: undefined | string;
    onCancel?: undefined | (() => void);
    onOK?: undefined | (() => void);
    cancelLabel?: undefined | string;
    okLabel?: undefined | string;
}>> = ({show, title, onCancel, onOK, cancelLabel, okLabel, children, ...props}) => {
    modalZindex ++;
    if(show) {
        return <div className="modal-underlay" style={{zIndex: modalZindex}}>
            <div className="modal">
                {!!title && <div className="modal-title">{title}</div>}
                {children}
                <div className="modal-buttons">
                    <button className="modal-cancel" onClick={onCancel ? onCancel : ()=>{}}>{!!cancelLabel ? cancelLabel : "Cancel"}</button>
                    <button className="modal-ok" onClick={onOK ? onOK : ()=>{}}>{!!okLabel ? okLabel : "OK"}</button>
                </div>
            </div>
        </div>
    }
    return null;
}