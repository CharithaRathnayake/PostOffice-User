import { combineReducers } from "redux";
import complaintReducer from "./components/pages/Complain/complaintReducer";
import checkDTReducer from "./components/pages/DeliveryTime/checkDTReducer";
import trackingReducer from "./components/pages/Track/trackingReducer";

export default combineReducers({
    complaintReducer,
    checkDTReducer,
    trackingReducer
});