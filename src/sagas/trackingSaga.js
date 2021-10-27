import { call, put, take } from "redux-saga/effects";
import { firestore } from "../firebase";
import { getDestinationSuccess } from "../components/pages/Track/trackingActions";
import { eventChannel } from "redux-saga";



function* getPostLocation(pid) {
    try{
        const data = firestore.collection("DeliveredMails").doc(pid);
    const channel1 = eventChannel((emit) => data.onSnapshot(emit));
    const Data = yield take(channel1);
    let post = Data.data();
    const postOfficeID=post.destinationPostoffice.id;
    //console.log(post.destinationPostoffice);
    //console.log(postOfficeID);
    const datat=firestore.collection("PostOffice").doc(postOfficeID);
    const channel2 =eventChannel((emit)=>datat.onSnapshot(emit));
    const destData=yield take(channel2);


    return {

        pid: pid,
        destination: destData.data().location,
        

    }
    //const postoffice=firestore.doc(post.destinationPostoffice);



    }catch{
        console.log("Error at getDestination function");
    }
    //console.log("pid",pid)
    
}



export function* getDestinationSaga(pid) {
    //console.log("postID", pid.pid.values.pid);
    const PID = pid.pid.values.pid
    let destination = yield call(getPostLocation, PID);


    //console.log("res ", location);
    yield put(getDestinationSuccess(destination));

}