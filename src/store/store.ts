import { createStore, combineReducers, applyMiddleware } from "redux";
import { buttonsReducer } from "./buttonsReducer";
import { backgroundReducer } from "./backgroundReducer";
import { ReducerImg } from "./imgReducer";
import { ReducerText } from "./textReducer";
import { figuresReducer } from "./figuresReducer";
// import { logger } from './middlewares/logger'
// import React from 'react'

const rootReducer = combineReducers({
  buttonsReducer,
  backgroundReducer,
  ReducerImg,
  ReducerText,
  figuresReducer,
});

export const store = createStore(rootReducer, applyMiddleware());

export type RootState = ReturnType<typeof rootReducer>;
