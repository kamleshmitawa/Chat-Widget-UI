import reducer from "./reducer";
import { h, Component } from "preact";

import { applyMiddleware, createStore } from "redux";
import logger from 'redux-logger';

export const store = createStore(reducer,{}, applyMiddleware(logger))
