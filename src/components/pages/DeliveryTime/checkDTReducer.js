import * as types from "./checkDTActionTypes";

const initialState = {
    error:false,   
    location:[],
    dataRetrieved:false,
    isLoading:false,
    pid:''
        
}

function DeliveryReducer (state=initialState,action){
    //console.log("complaintReducer");
    switch(action.type){
        
        case types.GET_POSTLOCATIONS_START:
            //console.log("get Post start");
            return{
                ...state,
                dataRetrieved:false,
                isLoading:true
            };
        case types.GET_POSTLOCATIONS_SUCCESS:
            console.log("GET_Locations_Success",action.postLocations);
            
                return{
                    ...state,
                    location:[action.postLocations],
                    dataRetrieved:true,
                    isLoading:false
                };
            
            
        
        case types.GET_POSTLOCATIONS_FAIL:
        
            return{
                ...state,
                error:action.error,
                dataRetrieved:false,
                isLoading:false
            };
        
            
        default:
            return state;
    }
};

export default DeliveryReducer;