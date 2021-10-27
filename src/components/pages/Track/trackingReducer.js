import * as types from "./trackingActionTypes";

const initialState = {
    error:false,   
    destination:[],
    dataRetrieved:false,
    isLoading:false,

        
}

function TrackingReducer (state=initialState,action){
    console.log("trackingReducer");
    switch(action.type){
        
        case types.GET_DESTINATION_START:
            console.log("get Post start");
            return{
                ...state,
                dataRetrieved:false,
                isLoading:true
            };
        case types.GET_DESTINATION_SUCCESS:
            console.log("GET_Destination_Success",action.destination);
            
                return{
                    ...state,
                    destination:[action.destination],
                    dataRetrieved:true,
                    isLoading:false
                };
            
            
        
        case types.GET_DESTINATION_FAIL:
        
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

export default TrackingReducer;