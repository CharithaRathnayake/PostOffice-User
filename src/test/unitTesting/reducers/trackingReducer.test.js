import trackingReducer from '../../../components/pages/Track/trackingReducer';
import * as actionTypes from '../../../components/pages/Track/trackingActionTypes';

describe('CheckDT Reducer', () => {

    it('Should return default state', () => {
        const newState = trackingReducer(undefined, {});
        const initialState= {
            error:false,   
            destination:[],
            dataRetrieved:false,
            isLoading:false,
            
          };
        expect(newState).toEqual(initialState);
    });

    it('Should return state for get destination start', () => {

        const newState = trackingReducer(undefined, {
            type: actionTypes.GET_POSTLOCATIONS_START
        });
        const expectState={
            error:false,   
            destination:[],
            dataRetrieved:false,
            isLoading:true,
            
            
        };
        expect(newState).toEqual(expectState);

    });

    it('Should return state for get post locations success', () => {

        const data=[{title:"test 1"},{title:"test 2"},{title:"test 2"}];
        const newState = trackingReducer(undefined, {
            type: actionTypes.GET_POSTLOCATIONS_SUCCESS,
            destination:data,
        });
        const expectState= {
            error:null,   
            destination:data,
            dataRetrieved:true,
            isLoading:false,
            
        };
        expect(newState).toEqual(expectState);

    });

    it('Should return state for get post locations error', () => {

        const errorMsg="Error at getting post locations"
        const newState = trackingReducer(undefined, {
            type: actionTypes.GET_POSTLOCATIONS_FAIL,
            error:errorMsg
        });
        const expectState= {
            error:errorMsg,   
            destination:[],
            dataRetrieved:false,
            isLoading:false,
        };
        expect(newState).toEqual(expectState);

     });   

});