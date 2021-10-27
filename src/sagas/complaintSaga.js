import { call,put,take} from "redux-saga/effects";
import {firestore} from "../firebase";
import firebase from 'firebase/compat/app';
import {getPostOfficeSuccess,getPIDSuccess,addComplaintSuccess} from "../components/pages/Complain/complaintActions";
import { eventChannel } from "redux-saga";

async function addComplaintDetails(name,email,contactNumber,pid,postoffice,message){
     
      
    return firestore
    .collection("Complains")
    .add({
        name:name,
        email:email,
        contactNumber:contactNumber,
        pid:pid,
        postoffice:firestore.doc('PostOffice/'+postoffice),
        message:message,
        state:"unsolved",
        timestamp:firebase.firestore.Timestamp.now()
        
    })
    .catch((e)=>{
        console.log("Error occured");
        return null;
    })
    
}

function* getPostOffice(){
    console.log("firestore", firestore);
    
    const ref = firestore.collection("PostOffice");
    console.log("get");
    const channel = eventChannel((emit) => ref.onSnapshot(emit));

    const Data = yield take(channel);
    console.log("Charitha");
    return Data.docs.map((doc: any) => {
        const data = doc.data();
        const documentID = doc.id;
        //console.log(data.city);
        return {
            
            code: documentID,
            city:data.city
            
            
        };
        
        
    });
      
  
}

function* getPendingPID(){
    

    const pending = firestore.collection("PendingMails");
    const channel1 = eventChannel((emit) => pending.onSnapshot(emit));
    

    const Pending = yield take(channel1);
    return Pending.docs.map((doc: any) => {
        
        const documentID = doc.id;
        //console.log(data.city);
        return {
            
            pid:documentID
            
        };
    })
}
        
function* getDeliveredPID(){
    
    
    
    const delivered = firestore.collection("DeliveredMails");
    const channel2 = eventChannel((emit) => delivered.onSnapshot(emit));

    const Delivered = yield take(channel2);
    return Delivered.docs.map((doc: any) => {
        
        const documentID = doc.id;
        //console.log(data.city);
        return {
            
            pid:documentID,
            
        };
    })
}       


export function* addComplaintSaga(data){

    //console.log("addpostsaga",data.data.values)   
    const name = data.data.values.name
    const email= data.data.values.email
    const contactNumber=data.data.values.contactNumber
    const pid=data.data.values.pid
    const postoffice=data.data.values.postOffice
    const message=data.data.values.message
    
    let result = yield call(addComplaintDetails,name,email,contactNumber,pid,postoffice,message);
    
    
    yield put(addComplaintSuccess(result));
    
}
export function* getPostOfficeSaga(){ 
    
    let postOffice = yield call(getPostOffice);
    
    console.log("res ",postOffice);
    yield put(getPostOfficeSuccess(postOffice));
    
}

export function* getPIDSaga(){ 
    //console.log("postOfficeID",postOfficeID);
    
    let Ppid = yield call(getPendingPID);

    let Dpid = yield call(getDeliveredPID);
    //console.log("res ",postOffice);
    yield put(getPIDSuccess(Ppid,Dpid));
    
}