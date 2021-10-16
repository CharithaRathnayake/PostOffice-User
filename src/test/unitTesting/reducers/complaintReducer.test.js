import complaintReducer from '../../../components/pages/Complain/complaintReducer';
import * as actionTypes from '../../../components/pages/Complain/complaintActionTypes';

describe('Complaint Reducer', () => {

    it('Should return default state', () => {
        const newState = complaintReducer(undefined, {});
        const initialState= {
            error:null,   
            postOffice:[],
            Ppid: [],
            Dpid:[],
            pidRetrieved:false,
            postOfficeRetrieved:false,
            isLoading:false,
            
          };
        expect(newState).toEqual(initialState);
    });

    it('Should return state for get postOffice start', () => {

        const newState = complaintReducer(undefined, {
            type: actionTypes.GET_POSTOFFICE_START
        });
        const expectState={
            error:null,   
            postOffice:[],
            Ppid: [],
            Dpid:[],
            pidRetrieved:false,
            postOfficeRetrieved:false,
            isLoading:true,
            
            
        };
        expect(newState).toEqual(expectState);

    });

    it('Should return state for get postoffice success', () => {

        const data=[{title:"test 1"},{title:"test 2"},{title:"test 2"}];
        const newState = complaintReducer(undefined, {
            type: actionTypes.GET_POSTOFFICE_SUCCESS,
            postOffice:data,
        });
        const expectState= {
            error:null,   
            postOffice:data,
            Ppid: [],
            Dpid:[],
            pidRetrieved:false,
            postOfficeRetrieved:true,
            isLoading:false,
        };
        expect(newState).toEqual(expectState);

    });

    it('Should return state for get postoffice error', () => {

        const errorMsg="Error at getting postoffice"
        const newState = complaintReducer(undefined, {
            type: actionTypes.GET_POSTOFFICE_FAIL,
            error:errorMsg
        });
        const expectState= {
            error:errorMsg,   
            postOffice:[],
            Ppid: [],
            Dpid:[],
            pidRetrieved:false,
            postOfficeRetrieved:false,
            isLoading:false,
        };
        expect(newState).toEqual(expectState);

     });

     it('Should return state for get pid start', () => {

        const newState = complaintReducer(undefined, {
            type: actionTypes.GET_PID_START
        });
        const expectState={
            error:null,   
            postOffice:[],
            Ppid: [],
            Dpid:[],
            pidRetrieved:false,
            postOfficeRetrieved:false,
            isLoading:true,
            
        };
        expect(newState).toEqual(expectState);

    });

    it('Should return state for get pid success', () => {

        const data1=[{title:"test 1"},{title:"test 2"},{title:"test 3"}];
        const data2=[{title:"test 1"},{title:"test 2"},{title:"test 3"}];
        const newState = complaintReducer(undefined, {
            type: actionTypes.GET_PID_SUCCESS,
            Ppid:data1,
            Dpid:data2
        });
        const expectState= {
            error:null,   
            postOffice:[],
            Ppid: data1,
            Dpid:data2,
            pidRetrieved:true,
            postOfficeRetrieved:false,
            isLoading:false,
        };
        expect(newState).toEqual(expectState);

    });

    it('Should return state for get pid error', () => {

        const errorMsg="Error at getting pid"
        const newState = complaintReducer(undefined, {
            type: actionTypes.GET_PID_FAIL,
            error:errorMsg
        });
        const expectState= {
            error:errorMsg,   
            postOffice:[],
            Ppid: [],
            Dpid:[],
            pidRetrieved:false,
            postOfficeRetrieved:false,
            isLoading:false,
        };
        expect(newState).toEqual(expectState);

     });

     it('Should return state for add complaint start', () => {

        const newState = complaintReducer(undefined, {
            type: actionTypes.ADD_COMPLAINT_START,
            
        });
        const expectState={
            error:null,   
            postOffice:[],
            Ppid: [],
            Dpid:[],
            pidRetrieved:false,
            postOfficeRetrieved:false,
            isLoading:false,
            
        };
        expect(newState).toEqual(expectState);

    });

    it('Should return state for add complaint success', () => {

        
        const newState = complaintReducer(undefined, {
            type: actionTypes.ADD_COMPLAINT_SUCCESS
        });
        const expectState= {
            error:null,   
            postOffice:[],
            Ppid: [],
            Dpid:[],
            pidRetrieved:false,
            postOfficeRetrieved:false,
            isLoading:false,
        };
        expect(newState).toEqual(expectState);

    });

    it('Should return state for add complaint error', () => {

        const errorMsg="Error at adding complaint"
        const newState = complaintReducer(undefined, {
            type: actionTypes.ADD_COMPLAINT_FAIL,
            error:errorMsg
        });
        const expectState= {
            error:errorMsg,   
            postOffice:[],
            Ppid: [],
            Dpid:[],
            pidRetrieved:false,
            postOfficeRetrieved:false,
            isLoading:false,
        };
        expect(newState).toEqual(expectState);

     });
     

});