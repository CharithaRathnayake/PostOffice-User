import * as types from "./checkDTActionTypes";

export function getPostLocationStart (pid){
    console.log("putpost",pid);
    return{type: types.GET_POSTLOCATIONS_START,pid}
};

export function getPostLocationSuccess (postLocations){
    return{type: types.GET_POSTLOCATIONS_SUCCESS,postLocations}
};

export function getPostLocationFail (error){
    return{type: types.GET_POSTLOCATIONS_FAIL,error}
};
