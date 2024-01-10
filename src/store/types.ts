/* eslint-disable no-unused-vars */
export type Point = {
  x: number;
  y: number;
};

export type SizeType = {
  width: number;
  height: number;
};

export type ContentType = ImageType | TextType | ArtObjType;

export type ImageType = {
  src: string;
  width: number;
  height: number;
  selected: boolean;
} & Point;

export type TextType = {
  width?: string;
  height?: string;
  text: string;
  fontWeight: string;
  fontSize: string;
  fontColor: string;
  fontFamily: string;
} & Point;

export type ArtObjType = {
  id: string;
  width?: string;
  height?: string;
  figure: FigureType;
} & Point;

export enum FigureType {
  circle,
  rect,
}
