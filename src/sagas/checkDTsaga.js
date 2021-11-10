import { call, put, take } from "redux-saga/effects";
import { firestore } from "../firebase";
import { getPostLocationSuccess } from "../components/pages/DeliveryTime/checkDTActions";
import { eventChannel } from "redux-saga";



function* getPostLocation(pid) {
    try{
        const data = firestore.collection("PendingMails").doc(pid);
    const channel1 = eventChannel((emit) => data.onSnapshot(emit));
    const Data = yield take(channel1);
    let post = Data.data();
    const postOfficeID=post.destinationPostoffice.id;
    //console.log(post.destinationPostoffice);
    console.log(post);
    const datat=firestore.collection("PostOffice").doc(postOfficeID);
    const channel2 =eventChannel((emit)=>datat.onSnapshot(emit));
    const destData=yield take(channel2);


    return {

        location: post.locations,
        pid: pid,
        destination: destData.data(),
        error:false,
        state:post.state

    }
    //const postoffice=firestore.doc(post.destinationPostoffice);



    }catch{
        return{
            error:true
        }
    }
    //console.log("pid",pid)
    
}



export function* getPostLocationSaga(pid) {
    console.log("postID", pid.pid.values.pid);
    const PID = pid.pid.values.pid
    let location = yield call(getPostLocation, PID);


    console.log("res ", location);
    yield put(getPostLocationSuccess(location));

}