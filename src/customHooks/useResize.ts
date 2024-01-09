/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-unused-vars */
import { useEffect, RefObject } from "react";
type positionType = {
  x: number,
  y: number
}

type sizeType = {
  width: number,
  height: number
}

export function useResize(
  resizeBlock: (index: number, width: number, height: number) => void,
  setPosition: (index: number, x: number, y: number) => void,
  itemBlock: RefObject<HTMLElement>,
  LeftTop: RefObject<HTMLElement>,
  RightTop: RefObject<HTMLElement>,
  LeftBottom: RefObject<HTMLElement>,
  RightBottom: RefObject<HTMLElement>,
  item: RefObject<HTMLElement>,
  modelPos: positionType,
  modelSize: sizeType,
  indexItem: number,
): void {

  useEffect(() => {

    const currentExternalBlock: HTMLElement | null = itemBlock.current;  // внешний блок

    const currentNestedBlock: HTMLElement | null = item.current;  // картинка
    const pointLT: HTMLElement | null = LeftTop.current;
    const pointRT: HTMLElement | null = RightTop.current;
    const pointLB: HTMLElement | null = LeftBottom.current;
    const pointRB: HTMLElement | null = RightBottom.current;

    let startPos: positionType;
    const MIN_SIZE_BLOCK: number = 20;

    function handleMousedown(e: MouseEvent): void {
      e.preventDefault();
      startPos = {
        x: e.pageX,
        y: e.pageY
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    // let externalBlockNewPos: positionType;

    let newWidth: number = modelSize.width;
    let newHeight: number = modelSize.height;
    let currWidth: number = modelSize.width;
    let currHeight: number = modelSize.height;
    let currPos: positionType = modelPos;
    let newPos: positionType;

    function handleMouseMove(e: MouseEvent): void {
      e.preventDefault();
      const delta: positionType = {
        x: e.pageX - startPos.x,
        y: e.pageY - startPos.y,
      }

      switch (e.target) {
        case pointRB:
          newWidth = currWidth + delta.x;
          newHeight = currHeight + delta.y;
          newPos = {
            x: currPos.x,
            y: currPos.y,
          }
          if (newWidth > MIN_SIZE_BLOCK) {
            if (currentNestedBlock != null) currentNestedBlock.style.width = `${newWidth}px`;
            if (currentExternalBlock != null) currentExternalBlock.style.width = `${newWidth}px`;
          }
          if (newHeight > MIN_SIZE_BLOCK) {
            if (currentNestedBlock != null) currentNestedBlock.style.height = `${newHeight}px`;
            if (currentExternalBlock != null) currentExternalBlock.style.height = `${newHeight}px`;
          }
          break;
        case pointLB:
          newWidth = currWidth - delta.x;
          newHeight = currHeight + delta.y;
          newPos = {
            x: currPos.x + delta.x,
            y: currPos.y,
          }
          if (newHeight > MIN_SIZE_BLOCK)
            if (currentNestedBlock != null) currentNestedBlock.style.height = `${newHeight}px`;
            if (currentExternalBlock != null) currentExternalBlock.style.height = `${newHeight}px`;
          if (newWidth > MIN_SIZE_BLOCK) {
            if (currentNestedBlock != null) currentNestedBlock.style.width = `${newWidth}px`;
            if (currentExternalBlock != null) currentExternalBlock.style.width = `${newWidth}px`;

            if (currentNestedBlock != null) currentNestedBlock.style.left = `${newPos.x}px`;
            if (currentExternalBlock != null) currentExternalBlock.style.left = `${newPos.x}px`;
          }
          break;
        case pointRT:
          newWidth = currWidth + delta.x;
          newHeight = currHeight - delta.y;
          newPos = {
            x: currPos.x,
            y: currPos.y + delta.y,
          }
          if (newWidth > MIN_SIZE_BLOCK) 
            if (currentNestedBlock != null) currentNestedBlock.style.width = `${newWidth}px`;
            if (currentExternalBlock != null) currentExternalBlock.style.width = `${newWidth}px`;
          if (newHeight > MIN_SIZE_BLOCK) {
            if (currentExternalBlock != null) currentExternalBlock.style.height = `${newHeight}px`;
            if (currentNestedBlock != null) currentNestedBlock.style.height = `${newHeight}px`;

            if (currentExternalBlock != null) currentExternalBlock.style.top = `${newPos.y}px`;
            if (currentNestedBlock != null) currentNestedBlock.style.top = `${newPos.y}px`;

          }
          break;
        case pointLT:
          newWidth = currWidth - delta.x;
          newHeight = currHeight - delta.y;
          newPos = {
            x: currPos.x + delta.x,
            y: currPos.y + delta.y,
          }
          if (newWidth > MIN_SIZE_BLOCK) {
            if (currentNestedBlock != null) currentNestedBlock.style.width = `${newWidth}px`;
            if (currentExternalBlock != null) currentExternalBlock.style.width = `${newWidth}px`;
            if (currentNestedBlock != null) currentNestedBlock.style.left = `${newPos.x}px`;
            if (currentExternalBlock != null) currentExternalBlock.style.left = `${newPos.x}px`;
          }
          if (newHeight > MIN_SIZE_BLOCK) {
            if (currentNestedBlock != null) currentNestedBlock.style.height = `${newHeight}px`;
            if (currentExternalBlock != null) currentExternalBlock.style.height = `${newHeight}px`;

            if (currentNestedBlock != null) currentNestedBlock.style.top = `${newPos.y}px`;
            if (currentExternalBlock != null) currentExternalBlock.style.top = `${newPos.y}px`;
          }
          break;
      }
    }

    function handleMouseUp(): void {
      const newSize: sizeType = { width: newWidth, height: newHeight }
      resizeBlock(indexItem, newSize.width, newSize.height);
      if (newPos) setPosition(indexItem, newPos.x, newPos.y);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    if (pointLT != null) pointLT.addEventListener("mousedown", handleMousedown);
    if (pointRT != null) pointRT.addEventListener("mousedown", handleMousedown);
    if (pointLB != null) pointLB.addEventListener("mousedown", handleMousedown);
    if (pointRB != null) pointRB.addEventListener("mousedown", handleMousedown);
    return () => {
      if (pointLT) pointLT.removeEventListener("mousedown", handleMousedown);
      if (pointRT) pointRT.removeEventListener("mousedown", handleMousedown);
      if (pointLB) pointLB.removeEventListener("mousedown", handleMousedown);
      if (pointRB) pointRB.removeEventListener("mousedown", handleMousedown);
    };
  }, [resizeBlock, setPosition, LeftTop, RightTop, LeftBottom, RightBottom, itemBlock, item, indexItem, modelPos, modelSize]);
}