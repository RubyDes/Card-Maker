/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-unused-vars */
import { Point, SizeType } from "./types";
import { AnyAction } from "redux";

type CircleAction = {
    type: FiguresActionType.INSERT_CIRCLE;
    name: string;
} & Point & SizeType

type TriangleAction = {
    type: FiguresActionType.INSERT_Triangle;
    name: string;
} & Point & SizeType


enum FiguresActionType {
    INSERT_CIRCLE = "INSERT_CIRCLE",
    INSERT_Triangle = "INSERT_Triangle",
    CLEAR_SVG_STATE = "CLEAR_SVG_STATE",
    MOVE_SVG = "MOVE_SVG",
    DELETE_SVG = "DELETE_SVG"
}

type FigureType = {
    name: string,
} & Point & SizeType

interface InsertFiguresType {
    arr: Array<FigureType>
}

const defaultState: InsertFiguresType = {
    arr: []
}

export function insertCircle(): CircleAction {
    return {
        type: FiguresActionType.INSERT_CIRCLE,
        name: 'circle',
        width: 200,
        height: 100,
        x: 50,
        y: 50
    }
}

export function insertHeart(): TriangleAction {
    return {
        type: FiguresActionType.INSERT_Triangle,
        name: 'triangle',
        width: 200,
        height: 100,
        x: 50,
        y: 50
    }
}

export function clearSvg(): AnyAction {
    return {
        type: FiguresActionType.CLEAR_SVG_STATE,
    }
}

export function deleteSvg(index: number): AnyAction {
    return {
        type: FiguresActionType.DELETE_SVG,
        index: index
    }
}

export function moveSvg(index: number, x: number, y: number): AnyAction {
    return {
        type: FiguresActionType.MOVE_SVG,
        index: index,
        x: x,
        y: y
    }
}

export function pushNewSVGArrToReducer(newArr: any): AnyAction {
    return {
        type: "NEW_SVG_ARR",
        newArr: newArr
    }
}

const newArrSvg = (contentList: FigureType[], id: number, x: number, y: number): FigureType[] => {
    const newContent: FigureType[] = contentList;

    newContent.forEach((item: FigureType, index: number) => {

        if (index === id) {
            newContent[index].x = x;
            newContent[index].y = y;
        }
    })
    return newContent;
}

export const figuresReducer = (state = defaultState, action: AnyAction): InsertFiguresType => {
    switch (action.type) {
        case FiguresActionType.INSERT_CIRCLE:
            return {
                ...state,
                arr: state.arr.concat({
                    name: action.name,
                    width: action.width,
                    height: action.height,
                    x: action.x,
                    y: action.y
                })
            }
        case FiguresActionType.INSERT_Triangle:
            return {
                ...state,
                arr: state.arr.concat({
                    name: action.name,
                    width: action.width,
                    height: action.height,
                    x: action.x,
                    y: action.y
                })
            }
        case FiguresActionType.CLEAR_SVG_STATE:
            return {
                ...state,
                arr: []
            }
        case FiguresActionType.MOVE_SVG:
            return {
                ...state,
                arr: newArrSvg(state.arr, action.index, action.x, action.y)
            }
        case FiguresActionType.DELETE_SVG:
            return {
                ...state,
                arr: state.arr.filter((eachElem, index) => action.index !== index)
            }
        case "NEW_SVG_ARR":
            return {
                ...state,
                arr: action.newArr
            }
        default:
            return state
    }
}