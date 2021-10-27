import { all, takeEvery, takeLatest } from "redux-saga/effects";

import * as complaintActionTypes from "./../components/pages/Complain/complaintActionTypes";
import * as checkDTActionTypes from "./../components/pages/DeliveryTime/checkDTActionTypes";
import * as trackingActionTypes from "./../components/pages/Track/trackingActionTypes";
import { getPostLocationSaga } from "./checkDTsaga";
import { getPostOfficeSaga,getPIDSaga,addComplaintSaga } from "./complaintSaga.js";
import { getDestinationSaga } from "./trackingSaga";

export default function* root() {
    yield all([
        takeEvery(complaintActionTypes.ADD_COMPLAINT_START,addComplaintSaga),
        takeLatest(complaintActionTypes.GET_POSTOFFICE_START,getPostOfficeSaga),
        takeLatest(complaintActionTypes.GET_PID_START,getPIDSaga),
        takeLatest(checkDTActionTypes.GET_POSTLOCATIONS_START,getPostLocationSaga),
        takeLatest(trackingActionTypes.GET_DESTINATION_START,getDestinationSaga)
    ]);
}