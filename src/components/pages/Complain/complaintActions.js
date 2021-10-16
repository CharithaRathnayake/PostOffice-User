import * as types from "./complaintActionTypes";

export function addComplaintStart (data){ 
    //console.log("d",data);
    return{type: types.ADD_COMPLAINT_START,data}
};

export function addComplaintSuccess (){
    //console.log(addPostSuccess);
    return{type: types.ADD_COMPLAINT_SUCCESS}
};

export function addComplaintFail (error){
    return{type: types.ADD_COMPLAINT_FAIL,error}
};

export function getPostOfficeStart (){
    //console.log("putpost");
    return{type: types.GET_POSTOFFICE_START}
};

export function getPostOfficeSuccess (postOffice){
    return{type: types.GET_POSTOFFICE_SUCCESS,postOffice}
};

export function getPostOfficeFail (error){
    return{type: types.GET_POSTOFFICE_FAIL,error}
};

export function getPIDStart (){
    //console.log("putpost");
    return{type: types.GET_PID_START}
};

export function getPIDSuccess (Ppid,Dpid){
    return{type: types.GET_PID_SUCCESS,Ppid,Dpid}
};

export function getPIDFail (error){
    return{type: types.GET_PID_FAIL,error}
};