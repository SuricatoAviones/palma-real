import { combineReducers } from "redux";
import deportesReducer from "./deportesReducer";
import churuatasReducer from "./churuatasReducer";
import deportistasReducer from "./deportistasReducer";
import entradasReducer from "./entradasReducer";
import localesReducer from "./localesReducer";
import sociosReducer from "./sociosReducer";



export default combineReducers({
    deportes: deportesReducer,
    churuatas: churuatasReducer,
    deportistas: deportistasReducer,
    entradas: entradasReducer,
    socios: sociosReducer,
    locales: localesReducer
});