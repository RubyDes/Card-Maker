import { AnyAction } from "redux";
import { SizeType } from "./types";

const CREATE_DEFAULT_BACKGROUND = "CREATE_DEFAULT_BACKGROUND";
const CHANGE_WIDTH_CANVAS = "CHANGE_WIDTH_CANVAS";
const CHANGE_HEIGTH_CANVAS = "CHANGE_HEIGTH_CANVAS";


type backgroundReducerType = {
    bgColor: string,
    BGImage: string | null
} & SizeType

const defaultState: backgroundReducerType = {
    bgColor: '#ffff',
    width: 700,
    height: 450,
    BGImage: null
}

export function changeWidthCanvas(newWidth: number): AnyAction {
    return {
        type: CHANGE_WIDTH_CANVAS,
        width: newWidth
    }
}

export function createDefaultBG(): AnyAction {
    return {
        type: CREATE_DEFAULT_BACKGROUND
    }
}

export const backgroundReducer = (state = defaultState, action: AnyAction): backgroundReducerType => {
    switch (action.type) {
        case CREATE_DEFAULT_BACKGROUND:
            return { ...state, bgColor: '#ffff', width: 700, height: 450, BGImage: null }
        case CHANGE_WIDTH_CANVAS:
            return { ...state, width: action.width }
        case CHANGE_HEIGTH_CANVAS:
            return { ...state, height: action.height }
        default:
            return state
    }
}