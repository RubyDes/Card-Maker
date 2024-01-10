/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import style from "./Buttons.module.css";
import { useDispatch } from "react-redux";
import React from "react";

const Buttons = () => {
  const dispatch = useDispatch();

  const openDescImg = () => {
    dispatch({ type: "CLEAR_DESC" });
    dispatch({ type: "RENDER_DESC_INSERT_PIC", payload: true });
  };

  const openDescText = () => {
    dispatch({ type: "CLEAR_DESC" });
    dispatch({ type: "RENDER_DESC_TEXT", payload: true });
  };

  const openDescArtObj = () => {
    dispatch({ type: "CLEAR_DESC" });
    dispatch({ type: "RENDER_DESC_ARTOBJ", payload: true });
  };

  const openDescSave = () => {
    dispatch({ type: "CLEAR_DESC" });
    dispatch({ type: "RENDER_DESC_SAVE", payload: true });
  };

  const clearDescClear = () => {
    dispatch({ type: "CLEAR_DESC" });
    dispatch({ type: "RENDER_DESC_NEW", payload: true });
  };

  const buttons = [
    {
      id: "1",
      title: "Clear Canvas",
      nameImg: "add-file",
      onClick: clearDescClear,
    },
    {
      id: "2",
      title: "Add Picture",
      nameImg: "add-picture",
      onClick: openDescImg,
    }, //4
    {
      id: "3",
      title: "Add Art-object",
      nameImg: "art-object",
      onClick: openDescArtObj,
    }, //5
    { id: "4", title: "Add Text", nameImg: "add-text", onClick: openDescText }, //6
    { id: "5", title: "Save", nameImg: "save", onClick: openDescSave }, //7
  ];

  return (
    <div className={style.tools}>
      {buttons.map((key) => {
        return (
          <button
            key={key.id}
            className={style.button}
            title={key.title}
            onClick={key.onClick}
          >
            <input
              type="image"
              alt="icon"
              className={style.button__image}
              src={`./img/${key.nameImg}.png`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default Buttons;
