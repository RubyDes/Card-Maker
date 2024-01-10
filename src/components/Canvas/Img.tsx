/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { connect } from "react-redux";
import { positionType, useDragAndDrop } from "../../customHooks/useDragAndDrop";
import { useResize } from "../../customHooks/useResize";
import { deleteImage, moveImg, resizeImg } from "../../store/imgReducer";
import { RootState } from "../../store/store";
import "./Img.css";

interface PropsType {
  key: number;
  index: number;
  src: string;
  posX: number;
  posY: number;
  widthImg: number;
  heightImg: number;
}

const Img = (props: PropsType & Props) => {
  const imgResize = useRef<HTMLImageElement>(null);
  const pointLeftTop = useRef<HTMLDivElement>(null);
  const pointRightTop = useRef<HTMLDivElement>(null);
  const pointLeftBottom = useRef<HTMLDivElement>(null);
  const pointRightBottom = useRef<HTMLDivElement>(null);

  const imgBlock = useRef<HTMLImageElement>(null);
  const pos: positionType = { x: props.posX, y: props.posY };

  const [borderStyle, setBorderStyle] = useState("none");
  const changeStyle = () => {
    setBorderStyle("3px dashed black");
  };

  const modelSize = {
    width: props.widthImg,
    height: props.heightImg,
  };

  useResize(
    props.resizeImg,
    props.moveImg,
    imgBlock,
    pointLeftTop,
    pointRightTop,
    pointLeftBottom,
    pointRightBottom,
    imgResize,
    pos,
    modelSize,
    props.index,
  );

  useDragAndDrop(imgBlock, pos, props.moveImg, props.index);

  const setKeyDown = (e: React.KeyboardEvent<Element>) => {
    switch (e.code) {
      case "Delete":
        return props.deleteImage(props.index);
      case "Escape":
        return setBorderStyle("none");
    }
  };

  return (
    <div
      style={{
        display: "inline-block",
        position: "absolute",
        left: pos.x,
        top: pos.y,
        outline: borderStyle,
      }}
      ref={imgBlock}
      onDragStart={(e) => e.preventDefault()}
      onKeyDown={(e: React.KeyboardEvent) => setKeyDown(e)}
      onClick={changeStyle}
      tabIndex={0}
      key={props.index}
    >
      {borderStyle !== "none" ? (
        <div className="corner leftTopCorner" ref={pointLeftTop}></div>
      ) : undefined}
      {borderStyle !== "none" ? (
        <div className="corner rightTopCorner" ref={pointRightTop}></div>
      ) : undefined}

      <img
        ref={imgResize}
        alt=""
        src={props.src}
        style={{
          cursor: "pointer",
          width: props.widthImg + "px",
          height: props.heightImg + "px",
        }}
      />

      {borderStyle !== "none" ? (
        <div className="corner leftBottomCorner" ref={pointLeftBottom}></div>
      ) : undefined}
      {borderStyle !== "none" ? (
        <div className="corner rightBottomCorner" ref={pointRightBottom}></div>
      ) : undefined}
    </div>
  );
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

function mapStateToProps(state: RootState) {
  return {};
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    moveImg: (index: number, x: number, y: number) =>
      dispatch(moveImg(index, x, y)),
    resizeImg: (index: number, width: number, height: number) =>
      dispatch(resizeImg(index, width, height)),
    deleteImage: (index: number) => dispatch(deleteImage(index)),
  };
};

export default connect(null, mapDispatchToProps)(Img);
