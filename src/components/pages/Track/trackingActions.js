import * as types from "./trackingActionTypes";

export function getDestinationStart (pid){
    console.log("putpost",pid);
    return{type: types.GET_DESTINATION_START,pid}
};

export function getDestinationSuccess (destination){
    console.log("getDestinationSuccess",destination);
    return{type: types.GET_DESTINATION_SUCCESS,destination}
};

export function getDestinationFail (error){
    return{type: types.GET_DESTINATION_FAIL,error}
};