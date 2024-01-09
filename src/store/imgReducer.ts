import { AnyAction } from "redux";
import { ImageType } from "./types";

const INSERT_IMG = "INSERT_IMG";
const CLEAR_IMG_STATE = "CLEAR_IMG_STATE";
const MOVE_IMG = "MOVE_IMG";
const DELETE_IMAGE = "DELETE_IMAGE";
const RESIZE_IMAGE = "RESIZE_IMAGE";
const NEW_IMAGES_ARR = "NEW_IMAGES_ARR";

type InsertImgType = {
    arr: Array<ImageType>
}

const defaultState: InsertImgType = {
    arr: []
}

export function insertImg(srcImg: string, width: number, height: number): AnyAction {
    return {
        type: INSERT_IMG,
        newSrc: srcImg,
        x: 100,
        y: 100,
        width: width,
        height: height
    }
}

export function clearImages(): AnyAction {
    return {
        type: CLEAR_IMG_STATE,
    }
}

export function deleteImage(index: number): AnyAction {
    return {
        type: DELETE_IMAGE,
        index: index
    }
}

export function moveImg(index: number, x: number, y: number): AnyAction {
    return {
        type: MOVE_IMG,
        index: index,
        x: x,
        y: y
    }
}

export function pushNewImagesArrToReducer(newArr: any): AnyAction {
    return {
        type: "NEW_IMAGES_ARR",
        newArr: newArr
    }
}

export function resizeImg(index: number, width: number, height: number): AnyAction {
    return {
        type: RESIZE_IMAGE,
        index: index,
        width: width,
        height: height,
    }
}

const newArrImages = (contentList: ImageType[], id: number, x: number, y: number): ImageType[] => {
    const newContent: ImageType[] = contentList;

    newContent.forEach((item: ImageType, index: number) => {

        if (index === id) {
            newContent[index].x = x;
            newContent[index].y = y;
        }
    })
    return newContent;
}

const newArrImages2 = (contentList: ImageType[], id: number, width: number, height: number): ImageType[] => {
    const newContent: ImageType[] = contentList;
    console.log(width);
    newContent.forEach((item: ImageType, index: number) => {
        if (index === id) {
            newContent[index].width = width;
            newContent[index].height = height;
        }
    })
    return newContent;
}

export const ReducerImg = (state = defaultState, action: AnyAction): InsertImgType => {
    switch (action.type) {
        case CLEAR_IMG_STATE:
            return {
                ...state,
                arr: []
            }
        case DELETE_IMAGE:
            return {
                ...state,
                arr: state.arr.filter((eachElem, index) => action.index !== index)
            }
        case INSERT_IMG:
            return {
                ...state,
                arr: state.arr.concat({
                    src: action.newSrc,
                    x: action.x,
                    y: action.y,
                    width: action.width,
                    height: action.height,
                    selected: false
                })
            }
        case MOVE_IMG:
            return {
                ...state,
                arr: newArrImages(state.arr, action.index, action.x, action.y)
            }
        case RESIZE_IMAGE:
            return {
                ...state,
                arr: newArrImages2(state.arr, action.index, action.width, action.height)
            }
        case NEW_IMAGES_ARR:
            return { ...state, arr: action.newArr }
        default:
            return state
    }
}