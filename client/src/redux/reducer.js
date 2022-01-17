import {
    ADDTOKEN,
    LOGOUT
} from "./actiontypes";
import { loadData, saveData } from "../utils/LocalStorage"
const token = loadData("token");
const name = loadData("name");
const init = {
    isLogin: token ? true:false,
    token: token || "",
    Name: name || ""

};
export const AuthReducer = (state = init, {
    type,
    payload
}) => {
    switch (type) {
        case ADDTOKEN:
            console.log(payload);
            saveData("token", payload.token);
            saveData("name", payload.name);
            return {
                ...state, token: payload.token, isLogin: true ,Name: payload.name
            };
        case LOGOUT:
            saveData("token", "");
            saveData("name", "");
            return {
                ...state, token: "", isLogin: false, Name:""
            };
        default:
            return {
                ...state
            }
    }
}