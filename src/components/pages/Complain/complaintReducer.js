import * as types from "./complaintActionTypes";

const initialState = {
    error:null,   
    postOffice:[],
    Ppid: [],
    Dpid:[],
    pidRetrieved:false,
    postOfficeRetrieved:false,
    isLoading:false,
    
        
}

function complaintReducer (state=initialState,action){
    //console.log("complaintReducer");
    switch(action.type){
        
        case types.GET_POSTOFFICE_START:
            //console.log("get Post start");
            return{
                ...state,
                postOfficeRetrieved:false,
                isLoading:true
            };
        case types.GET_PID_START:
            //console.log("GET_START");
            return{
                ...state,
                pidRetrieved:false,
                isLoading:true
            };
        
            
        
        case types.GET_POSTOFFICE_SUCCESS:
            //console.log("types.GET_POSTOFFICE_SUCCESS")
            return{
                
                ...state,
                postOffice:[...action.postOffice],
                postOfficeRetrieved:true,
                isLoading:false
            };
        
        case types.GET_PID_SUCCESS:
            //console.log("get pid SUCCESS",action);
            return{
                
                ...state,
                Ppid:[...action.Ppid],
                Dpid:[...action.Dpid],
                pidRetrieved:true,
                isLoading:false
            };
        
        case types.GET_POSTOFFICE_FAIL:
        case types.GET_PID_FAIL:
            return{
                ...state,
                error:action.error,
                pidRetrieved:false,
                isLoading:false
            };
        case types.ADD_COMPLAINT_START:
                    
            return{
                ...state,
                
                
            };
        
            
        case types.ADD_COMPLAINT_SUCCESS:
        
            return{
                ...state,
                
            };
        
        case types.ADD_COMPLAINT_FAIL:
        
            return{
                ...state,
                error:action.error,

            };
            
        default:
            return state;
    }
};

export default complaintReducer;