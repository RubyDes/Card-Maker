type buttonsReducerType = {
  // visibleDescGreetings: boolean,
  // visibleDescTemplates: boolean,
  visibleDescNew: boolean;
  visibleDescArtObj: boolean;
  visibleDescBackground: boolean;
  visibleDescInsertPic: boolean;
  visibleDescSave: boolean;
  visibleDescText: boolean;
};

type buttonsAction = {
  type: string;
  payload: boolean;
};

const defaultState: buttonsReducerType = {
  // visibleDescGreetings: true,
  // visibleDescTemplates: false,
  visibleDescNew: false,
  visibleDescArtObj: false,
  visibleDescBackground: false,
  visibleDescInsertPic: false,
  visibleDescSave: false,
  visibleDescText: false,
};

export const buttonsReducer = (
  state = defaultState,
  action: buttonsAction,
): buttonsReducerType => {
  switch (action.type) {
    case "CLEAR_DESC":
      return {
        ...state,
        visibleDescNew: false,
        // visibleDescTemplates: false,
        // visibleDescGreetings: false,
        visibleDescArtObj: false,
        visibleDescBackground: false,
        visibleDescInsertPic: false,
        visibleDescSave: false,
        visibleDescText: false,
      };
    case "RENDER_DESC_NEW":
      return { ...state, visibleDescNew: action.payload };
    case "RENDER_DESC_ARTOBJ":
      return { ...state, visibleDescArtObj: action.payload };
    case "RENDER_DESC_BACKGROUND":
      return { ...state, visibleDescBackground: action.payload };
    case "RENDER_DESC_INSERT_PIC":
      return { ...state, visibleDescInsertPic: action.payload };
    case "RENDER_DESC_SAVE":
      return { ...state, visibleDescSave: action.payload };
    case "RENDER_DESC_TEXT":
      return { ...state, visibleDescText: action.payload };
    // case "RENDER_DESC_TEMPLATES":
    //     return { ...state, visibleDescTemplates: action.payload }
    default:
      return state;
  }
};
