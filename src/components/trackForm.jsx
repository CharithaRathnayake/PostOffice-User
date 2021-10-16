import React from "react";
import {useDispatch,useSelector} from "react-redux";
import {getPostLocationStart} from "./pages/DeliveryTime/checkDTActions";
import { CircularProgress, Grid } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import track from '../images/track.jpg';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {getDistance} from 'geolib';

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
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const PID=pid.Ppid.map((option)=> (option.pid))
    const delivered=pid.Dpid.map((option)=>(option.pid))
    PID.push(...delivered);

    const dispatch = useDispatch();  
    const validate =(values,open)=>{
        const errors={};
        
        if (PID.includes(values.pid)===false){
            errors.pid="Post ID is not valid";
        }else{
            setOpen(true);
        }
        return errors;
    }
    const initialState=useFormik({
        initialValues:{ 
            pid:""                
        },
        validate,
        onSubmit:(values,{resetForm})=>{
            
            initialState.touched.pid=false;
            
                                       
            dispatch(getPostLocationStart(initialState));
            resetForm({})
        },
        
        
    });

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
      };
    
    if (locations.dataRetrieved===true){
        
        console.log("deliveryF[0]location",locations);
        var dis = getDistance(
            {latitude: locations.location[0].location[0].location._lat, longitude: locations.location[0].location[0].location._long},
            {latitude: locations.location[0].location[locations.location[0].location.length-1].location._lat, longitude: locations.location[0].location[locations.location[0].location.length-1].location._long},
        );
        
        var distance= dis/1000; 
        var days=0
        if (distance===0){
             days=0;
        }else if(distance<=50){
             days=1;
        }else if(distance<=200){
             days=2;
        }else{
             days=3;
        }
    }
     
    return(
        <>
            <CssBaseline />
            <Grid container classname="deliveryContainer" spacing={2}>
            <Grid item xs={5}>
            <Container className={classes.deliveryImage} maxwidth="sm">
                <Typography component="div" style={{height: '50vh' ,textAlign:"center"}} >
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
                        <Button fullWidth type="submit"  variant="contained"color="secondary" >Submit</Button>
                        <br/><br/>
                    </form>

                
                </Typography>
                
                {((locations.dataRetrieved))?
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    >
                    <DialogTitle id="alert-dialog-slide-title">{'Estimated Delivery Time'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Post ID:{locations.location[0].pid}<br/><br/>
                            Maximum number of days for delivery :{days}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                        Close
                        </Button>
                    </DialogActions>
                    </Dialog>
                :((locations.isLoading)?
                (<Grid
                    container
                    alignItems="center"
                    style={{ marginTop: "25%",marginLeft:"45%" }}
                >
                    <Grid item>
                    <CircularProgress size={60} color="secondary" />
                    </Grid>
                </Grid>): 
                ((open===true)?            
                (    
                <p style={{color:"red",textAlign:"center",marginTop: "25%",marginLeft:"45%"}}>Error Occured: Please try again later</p>
                ):
                (<p></p>)))

            }
            </Container>
            </Grid>
            </Grid>
        </>
    )
                            
    
}

export default TrackForm;