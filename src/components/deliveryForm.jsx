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
import delivery from '../images/delivery.jpg';
import DeliveryCalc from "./deliveryCalc";


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
  

function DeliveryForm(pid) {
    //console.log(pid.Ppid);
    const locations = useSelector((state) => state.checkDTReducer);
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const PID=pid.Ppid.map((option)=> (option.pid))
    const delivered=pid.Dpid.map((option)=>(option.pid))
    //console.log(delivered,PID);

    const dispatch = useDispatch();  
    const validate =(values)=>{
        const errors={};
        //console.log(delivered.includes(values.pid));
        if (delivered.includes(values.pid)===true){
            errors.pid="Your post has already delivered";
        }else if (PID.includes(values.pid)===false){
            errors.pid="Post ID is not valid";
        }
        return errors;
    }
    const handleOpen=()=>{
        setOpen(true);
        
    }
    const initialState=useFormik({
        initialValues:{ 
            pid:"",               
        },
        validate,
        onSubmit:(values,{resetForm})=>{
            
            initialState.touched.pid=false;
            
            handleOpen();                           
            dispatch(getPostLocationStart(initialState));
            resetForm({})
        },
        
        
    });
    
    
    
     
    return(
        <>
            <CssBaseline />
            <Grid container classname="deliveryContainer" spacing={2}>
            <Grid item xs={5}>
            <Container className={classes.deliveryImage} maxwidth="sm">
                <Typography component="div" style={{height: '50vh' ,textAlign:"center"}} >
                <img className={classes.img} alt="" src={delivery} />
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
                <DeliveryCalc locations={locations}/>
                
                    
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

export default DeliveryForm;