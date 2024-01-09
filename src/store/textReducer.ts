import { AnyAction } from "redux";
import { Point, TextType } from "./types";

const INSERT_TEXT = "INSERT_TEXT";
const CHANGE_TEXT = "CHANGE_TEXT";
const MOVE_TEXT = "MOVE_TEXT";
const CHANGE_FONT_SIZE = "CHANGE_FONT_SIZE";
const CHANGE_FONT_COLOR = "CHANGE_FONT_COLOR";
const CHANGE_FONT_FAMILY = "CHANGE_FONT_FAMILY";
const CHANGE_FONT_WEIGHT = "CHANGE_FONT_WEIGHT";
const CLEAR_TEXT_STATE = "CLEAR_TEXT_STATE";
const NEW_TEXT_ARR = "NEW_TEXT_ARR";
const DELETE_TEXT = "DELETE_TEXT";

type InsertTextType = {
    arr: Array<TextType>,
    fontColor: string,
    fontSize: string,
    fontFamily: string,
    fontWeight: string,
} & Point

const defaultState: InsertTextType = {
    arr: [],
    x: 200,
    y: 200,
    fontWeight: '400',
    fontColor: '#000000',
    fontFamily: 'Arial',
    fontSize: '20'
}

export function clearTexts(): AnyAction {
    return {
        type: CLEAR_TEXT_STATE,
    }
}

export function insertText(): AnyAction {
    return {
        type: INSERT_TEXT,
        text: 'Input Text',
        x: 200,
        y: 200
    }
}

export function changeText(newString: string, id: number): AnyAction {
    return {
        indexArray: id,
        type: CHANGE_TEXT,
        text: newString,
    }
}

export function getFontSize(newFontSize: string): AnyAction {
    return {
        type: CHANGE_FONT_SIZE,
        newFontSize: newFontSize
    }
}

export function getFontColor(newFontColor: string): AnyAction {
    return {
        type: CHANGE_FONT_COLOR,
        newFontColor: newFontColor
    }
}

export function getFontFamily(newFontFamily: string): AnyAction {
    return {
        type: CHANGE_FONT_FAMILY,
        newFontFamily: newFontFamily
    }
}

export function getFontWeight(newFontWeight: string): AnyAction {
    return {
        type: CHANGE_FONT_WEIGHT,
        newFontWeight: newFontWeight
    }
}

export function moveText(index: number, x: number, y: number): AnyAction {
    return {
        type: MOVE_TEXT,
        index: index,
        x: x,
        y: y
    }
}

export function deleteTextBlock(index: number): AnyAction {
    return {
        type: DELETE_TEXT,
        index: index
    }
}

export function pushNewTextArrToReducer(newArr: any): AnyAction {
    return {
        type: "NEW_TEXT_ARR",
        newArr: newArr
    }
}

const newArrAfterChangeInput = (contentList: TextType[], id: number, str: string): TextType[] => {
    const newContent: TextType[] = contentList;

    newContent.forEach((item: TextType, index: number) => {

        if (index === id) {
            newContent[index].text = str;
        }
    })
    return newContent;
}

const newArrAfterChangePosition = (contentList: TextType[], id: number, x: number, y: number): TextType[] => {
    const newContent: TextType[] = contentList;

    newContent.forEach((item: TextType, index: number) => {
        if (index === id) {
            newContent[index].x = x;
            newContent[index].y = y;
        }
    })
    return newContent;
}

export const ReducerText = (state = defaultState, action: AnyAction): InsertTextType => {
    switch (action.type) {
        case INSERT_TEXT:
            return {
                ...state,
                arr: state.arr.concat({
                    x: action.x,
                    y: action.y,
                    text: action.text,
                    fontFamily: state.fontFamily,
                    fontSize: state.fontSize,
                    fontColor: state.fontColor,
                    fontWeight: state.fontWeight
                }),
            }
        case CHANGE_TEXT:
            return {
                ...state,
                arr: newArrAfterChangeInput(state.arr, action.indexArray, action.text)
            }
        case MOVE_TEXT:
            return {
                ...state,
                arr: newArrAfterChangePosition(state.arr, action.index, action.x, action.y)
            }
        case CLEAR_TEXT_STATE:
            return { ...state, arr: [] }
        case CHANGE_FONT_SIZE:
            return { ...state, fontSize: action.newFontSize }
        case CHANGE_FONT_FAMILY:
            return { ...state, fontFamily: action.newFontFamily }
        case CHANGE_FONT_WEIGHT:
            return { ...state, fontWeight: action.newFontWeight }
        case CHANGE_FONT_COLOR:
            return { ...state, fontColor: action.newFontColor }
        case NEW_TEXT_ARR:
            return { ...state, arr: action.newArr }
        case DELETE_TEXT:
            return {
                ...state,
                arr: state.arr.filter((eachElem, index) => action.index !== index)
            }
        default:
            return state
    }
}