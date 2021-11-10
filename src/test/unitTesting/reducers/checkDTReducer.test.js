import checkDTReducer from '../../../components/pages/DeliveryTime/checkDTReducer';
import * as actionTypes from '../../../components/pages/DeliveryTime/checkDTActionTypes';

describe('CheckDT Reducer', () => {

    it('Should return default state', () => {
        const newState = checkDTReducer(undefined, {});
        const initialState= {
            error:false,   
            location:[],
            dataRetrieved:false,
            isLoading:false,
            
          };
        expect(newState).toEqual(initialState);
    });

    it('Should return state for get post locations start', () => {

        const newState = checkDTReducer(undefined, {
            type: actionTypes.GET_POSTLOCATIONS_START
        });
        const expectState={
            error:null,   
            location:[],
            dataRetrieved:false,
            isLoading:true,
            
            
        };
        expect(newState).toEqual(expectState);

    });

    it('Should return state for get post locations success', () => {

        const data=[{title:"test 1"},{title:"test 2"},{title:"test 2"}];
        const newState = checkDTReducer(undefined, {
            type: actionTypes.GET_POSTLOCATIONS_SUCCESS,
            location:data,
        });
        const expectState= {
            error:null,   
            location:data,
            dataRetrieved:true,
            isLoading:false,
            
        };
        expect(newState).toEqual(expectState);

    });

    it('Should return state for get post locations error', () => {

        const errorMsg="Error at getting post locations"
        const newState = checkDTReducer(undefined, {
            type: actionTypes.GET_POSTLOCATIONS_FAIL,
            error:errorMsg
        });
        const expectState= {
            error:errorMsg,   
            location:[],
            dataRetrieved:false,
            isLoading:false,
        };
        expect(newState).toEqual(expectState);

     });   

});

