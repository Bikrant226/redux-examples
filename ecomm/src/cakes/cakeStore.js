import { createStore } from "redux";
import reducer from "./cakeReducer";

const store=createStore(reducer)

export default store