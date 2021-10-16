import { combineReducers } from "redux";
import complaintReducer from "./components/pages/Complain/complaintReducer";
import checkDTReducer from "./components/pages/DeliveryTime/checkDTReducer";

export default combineReducers({
    complaintReducer,
    checkDTReducer
});