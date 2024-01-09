/* eslint-disable @typescript-eslint/ban-types */
import { useRef, useState } from "react";
import { connect } from "react-redux";
import { positionType, useDragAndDrop } from "../../customHooks/useDragAndDrop";
import { changeText, deleteTextBlock, moveText } from "../../store/textReducer";
import { TextType } from "../../store/types";

interface TextComponentProps {
    posX: number,
    posY: number,
    index: number;
    text: TextType;
}

const TextComponent = (props: TextComponentProps & DispatchProps) => {

    const [borderStyle, setBorderStyle] = useState("none");
    const changeStyle = () => {     
        setBorderStyle("1px dashed black");
    };

    const setKeyDown = (e: React.KeyboardEvent<Element>) => {
        switch(e.code) {
            case "Delete":
                return props.deleteTextBlock(props.index);
            case 'Escape':
                return setBorderStyle('none');
        }
    };

    const imgBlock = useRef<HTMLImageElement>(null);

    const pos: positionType = {x: props.posX, y: props.posY};

    useDragAndDrop(imgBlock, pos, props.moveText, props.index);

    return (
        <div 
            ref={imgBlock}
            onClick={changeStyle}
            onKeyDown={(e: React.KeyboardEvent) => setKeyDown(e)}
            style={{
                position: 'absolute',
                display: 'inline-block',
                top: props.text.y,
                left: props.text.x,
                padding: '5px',
                border: borderStyle
            }}
        >
            <input
                onChange={(e) => props.changeText(e.target.value, props.index)}
                type="text"
                defaultValue={props.text.text}
                style={{
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    fontSize: props.text.fontSize + 'px',
                    fontFamily: props.text.fontFamily,
                    fontWeight: Number(props.text.fontWeight),
                    color: props.text.fontColor,
                }}
            />
        </div>
    )
}

type DispatchProps = ReturnType<typeof mapDispatchToProps>

const mapDispatchToProps = (dispatch: Function) => {
    return {
        changeText: (newString: string, id: number) => dispatch(changeText(newString, id)),
        moveText: (index: number, x: number, y: number) => dispatch(moveText(index, x, y)),
        deleteTextBlock: (index: number) => dispatch(deleteTextBlock(index)),
    }
}

export default connect(null, mapDispatchToProps)(TextComponent);