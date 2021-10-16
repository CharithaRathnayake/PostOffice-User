import React, {useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import {getPIDStart} from "../Complain/complaintActions";
import TrackForm from "../../trackForm";
import { CircularProgress, Grid } from "@material-ui/core";




function Track() {
        
    const details = useSelector((state) => state.complaintReducer);
    //console.log(details.Ppid);
    
    const dispatch = useDispatch();
    useEffect(() => {
        
        dispatch(getPIDStart());
        //console.log("dcf");
    }, [dispatch])
    
    return(
        <>
            
                
                {((details.pidRetrieved))?
                <div>
                    <TrackForm
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

export default Track;