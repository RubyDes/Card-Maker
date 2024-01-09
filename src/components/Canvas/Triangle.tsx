/* eslint-disable @typescript-eslint/ban-types */
import { useRef, useState } from "react";
import { connect } from "react-redux";
import { positionType, useDragAndDrop } from "../../customHooks/useDragAndDrop";
import { deleteSvg, moveSvg } from "../../store/figuresReducer";

type PropsType = {
  posX: number,
  posY: number,
  index: number
}

const Triangle = (props: PropsType & DispatchProps) => {

  const [borderStyle, setBorderStyle] = useState("none");
  const changeStyle = () => {
    setBorderStyle("1px dashed black");
  };

  const setKeyDown = (e: React.KeyboardEvent<Element>) => {
    switch (e.code) {
      case "Delete":
        return props.deleteSvg(props.index);
      case 'Escape':
        return setBorderStyle('none');
    }
  };

  const svgBlock = useRef(null);
  const pos: positionType = { x: props.posX, y: props.posY };

  useDragAndDrop(svgBlock, pos, props.moveSvg, props.index);

  return <svg
    onClick={changeStyle}
    onKeyDown={(e: React.KeyboardEvent) => setKeyDown(e)}
    tabIndex={0}
    ref={svgBlock}
    onDragStart={(e) => e.preventDefault()}
    width='100px'
    // height='100px'
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px" y="0px"
    viewBox="0 0 512 512"
    style={{ background: 'new 0 0 512 512', position: "absolute", top: pos.y, left: pos.x, border: borderStyle }}
    xmlSpace="preserve"
  >
    <g>
      <path style={{ fill: 'none', stroke: '#030104', strokeWidth: 10 }}  d="M250,0 L0,500 L500,500 Z"/>
    </g>
  </svg>
};


type DispatchProps = ReturnType<typeof mapDispatchToProps>

const mapDispatchToProps = (dispatch: Function) => {
  return {
    moveSvg: (index: number, x: number, y: number) => dispatch(moveSvg(index, x, y)),
    deleteSvg: (index: number) => dispatch(deleteSvg(index)),
  }
}

export default connect(null, mapDispatchToProps)(Triangle);
