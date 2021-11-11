import React from "react";
import {useDispatch,useSelector} from "react-redux";
import {getPostLocationStart} from "./pages/DeliveryTime/checkDTActions";
import {getDestinationStart} from "./pages/Track/trackingActions";
import { Grid } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import track from '../images/track.jpg';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import marker from '../images/mailMarker.png';




const useStyles = makeStyles((theme) => ({
    
    errorText:{
        color:"red"
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '120%',
        maxHeight: '120%',
      },
        
  }));
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function TrackForm(pid) {
    //console.log(pid.Ppid);
    const locations = useSelector((state) => state.checkDTReducer);
    //const destination = useSelector((state) => state.trackingReducer);
    const [open, setOpen] = React.useState(false);
    const [showingInfoWindow, setShowingInfoWindow] = React.useState(false);
    const classes = useStyles();
    const PID=pid.Ppid.map((option)=> (option.pid))
    const type=pid.Ppid.map((option)=>(option.type))
    const delivered=pid.Dpid.map((option)=>(option.pid))
    PID.push(...delivered);
    let long;
    let lat;
    let currentPID;
    let state;
    
    const dispatch = useDispatch();  
    const validate =(values)=>{
        const errors={};
        
        if (delivered.includes(values.pid)===true){
            errors.pid="Your post has already delivered";
        }else if (PID.includes(values.pid)===false){
            errors.pid="Post ID is not valid";
        }else if (type[PID.indexOf(values.pid)]==="MoneyOrder"){
            errors.pid="Money Orders Cannot Track";
        }
        return errors;
    }
    const handleOpen=()=>{
        setOpen(true);
        
    }
    const handleClose = () => {
        setOpen(false);
    };
    const initialState=useFormik({
        initialValues:{ 
            pid:""                
        },
        validate,
        onSubmit:(values,{resetForm})=>{
            
            initialState.touched.pid=false;
            //console.log("pid");
            handleOpen();
             
                //console.log("dispatch loca")
            dispatch(getPostLocationStart(initialState));
               
                                   
            
            resetForm({})
        },
        
        
    }); 
    const mapStyles = {        
        height: "100vh",
        width: "100%"};
    //console.log(locations)  
    const onMarkerClick = () => {
        setShowingInfoWindow(true);
    };
    
    const onInfoWindowClose = () =>{ 
        setShowingInfoWindow(false);
    };
    if (locations.dataRetrieved!==undefined ){
        if (locations.dataRetrieved){
            long=locations.location[0].location[locations.location[0].location.length-1].location._long
            lat=locations.location[0].location[locations.location[0].location.length-1].location._lat
            currentPID=locations.location[0].pid
            state=locations.location[0].state
        }
        
    }
     
      
    const defaultCenter = {
        lat: lat, lng: long
    }; 

    
    
    return(
        <>
            <CssBaseline />
            <Grid container classname="deliveryContainer" spacing={2}>
            <Grid item xs={5}>
            <Container className={classes.deliveryImage} maxwidth="sm">
                <Typography component="div" style={{height: '50vh' ,textAlign:"center"}} >
                <h1>Track Post</h1>
                <img className={classes.img} alt="" src={track} />
                </Typography>
            </Container>
            </Grid>
            <Grid item xs={6}>
            <Container className={classes.deliveryForm} maxWidth="sm">
                <Typography component="div" style={{height: '80vh' ,textAlign:"center"}} >
                    <br/><br/><br/><br/><br/>
                    <h1 style={{textAlign:"center"}}>Enter Your Post ID</h1>
                    <br/>
                    <form   onSubmit={initialState.handleSubmit}>                            
                        <div className="form-group">
                            <TextField
                                required
                                id="filled-full-width"
                                label="required"
                                variant="filled"
                                type="text"
                                className="form-control"
                                name="pid"
                                value={initialState.values.pid}
                                onChange={initialState.handleChange}
                                style={{ margin: 8 }}
                                placeholder="Post ID"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                               
                            />
                            
                        </div>
                        <div item className={classes.ErrorText}>
                            <span>
                            {initialState.touched.pid && initialState.errors.pid !== undefined ? (
                                <p className={classes.errorText}>{initialState.errors.pid}</p>
                            ) : null}
                            
                            </span>
                        </div>
                        <br/>  
                        <Button fullWidth type="submit"  variant="contained"color="primary" >Submit</Button>
                        <br/><br/>
                    </form>

                
                </Typography>
                
               
               
                <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                        Location
                        </Typography>
                    </Toolbar>
                    </AppBar>
                    <LoadScript
                        googleMapsApiKey='AIzaSyC1yEuCzdrETdnciayw9X8t246drbCJ51M'>
                        <GoogleMap
                            mapContainerStyle={mapStyles}
                            zoom={13}
                            center={defaultCenter}
                            
                        >
                        
                        
                        <Marker position={{ lat: lat, lng: long}}  clickable onClick={onMarkerClick}>
                            {showingInfoWindow === true && (
                            <InfoWindow
                                position={{
                                lat: lat,
                                lng: long
                                }}
                                onCloseClick={onInfoWindowClose}
                            >
                                <div>
                                <p>Post ID: {currentPID}<br/>
                                State: {state}<br/><br/>
                                Latitude: {lat}° N<br/>
                                Longitude: {long}° E
                                </p>
                                </div>
                            </InfoWindow>
                            )}
                        </Marker>
                          
                        </GoogleMap>
                    </LoadScript>
                    
                
                </Dialog>
                
            </Container>
            </Grid>
            </Grid>
        </>
    )
                            
    }

export default TrackForm;