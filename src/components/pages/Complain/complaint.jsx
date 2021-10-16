import React, {useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import {getPIDStart,getPostOfficeStart} from "./complaintActions";
import ComplaintForm from "../../complaintForm";
import { CircularProgress, Grid } from "@material-ui/core";




function Complaint() {
        
    const details = useSelector((state) => state.complaintReducer);
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPostOfficeStart());
        dispatch(getPIDStart());
        //console.log("dcf");
    }, [dispatch])
    
    return(
        <>
            
                
                {((details.pidRetrieved)&&(details.postOfficeRetrieved))?
                <div>
                    <ComplaintForm
                postOffice={details.postOffice}
                Ppid={details.Ppid}
                Dpid={details.Dpid}
                />
                </div>
                
                :((details.isLoading)?
                (<Grid
                    container
                    alignItems="center"
                    style={{ marginTop: "25%",marginLeft:"45%" }}
                >
                    <Grid item>
                    <CircularProgress size={60} color="secondary" />
                    </Grid>
                </Grid>):              
                (    
                <p style={{color:"red",textAlign:"center",marginTop: "25%",marginLeft:"45%"}}>Error Occured: Please try again later</p>
                ))}
                
            
        </>
    )
                            
    
}

export default Complaint;