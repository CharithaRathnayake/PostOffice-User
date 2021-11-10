import React from 'react';
import {useDispatch} from "react-redux";
import {addComplaintStart} from "./pages/Complain/complaintActions";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useFormik } from 'formik';
import emailjs from 'emailjs-com';

//import GenerateRandomCode from 'GenerateRandomCode';



const useStyles = makeStyles((theme) => ({
    
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      errorText:{
        color:"red"
    },
  }));

function ComplaintForm({postOffice,Ppid,Dpid}) {
    const PID=Ppid.map((option)=> (option.pid))
    const delivered=Dpid.map((option)=>(option.pid))
    PID.push(...delivered);
    console.log(postOffice);
    const validate =(values)=>{
        const errors={};
        // const value=[]
        // value.push(values.pid);
        // console.log(value[0],"18fjLrCS0gR1RGFkuaTO")
        // console.log(value)
        // console.log((PID.includes(value[0])));
        if (PID.includes(values.pid)===false){
            errors.pid="Post ID is not valid";
        }
        return errors;
    }
    
    const dispatch = useDispatch();    
    //console.log(Ppid,Dpid);   
    const initialState=useFormik({
        initialValues:{ 
            name:"",
            pid:"", 
            postOffice:"",
            contactNumber:"", 
            email:"",
            message:"",
                 
        },
        validate,
        onSubmit:(values,{resetForm})=>{
            initialState.touched.name=false;
            initialState.touched.pid=false;
            initialState.touched.postOffice=false;
            initialState.touched.contactNumber=false;
            initialState.touched.email=false;
            initialState.touched.message=false;

            emailjs.send(
                'service_cru4k5v',
                'template_xuq8igq',
                {to_name:values.name,pid:values.pid,TPnumber:values.contactNumber,message:values.message,reply_to:values.email},
                'user_2fYDijqNvk6GpCvie9JPk'
              )
                .then((response) => {
                  console.log('SUCCESS!', response.status, response.text);
                })
                .catch((err) => {
                  console.log('FAILED...', err);
                });
            dispatch(addComplaintStart(initialState));
            resetForm({})
        },
        
    });
    
    //console.log(initialState);
    
    const classes = useStyles();
                     
    
    return ( 
        <>
            
                
                <Container maxWidth="sm">
                    <h1 style={{textAlign:"center"}}>Complaint Form</h1>
                    <form   onSubmit={initialState.handleSubmit}>                            
                        <div className="form-group">
                            <TextField
                                required
                                id="filled-full-width"
                                label="Name"
                                variant="filled"
                                type="text"
                                className="form-control"
                                name="name"
                                value={initialState.values.name}
                                onChange={initialState.handleChange}
                                style={{ margin: 8 }}
                                placeholder="Name"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                               
                            />
                            
                        </div>
                        <div className="form-group">
                            <TextField
                                required
                                id="filled-full-width"
                                label="Email"
                                variant="filled"
                                type="email"
                                className="form-control"
                                name="email"
                                value={initialState.values.email}
                                onChange={initialState.handleChange}
                                
                                style={{ margin: 8 }}
                                placeholder="Email Address"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                               
                            />
                            
                        </div>
                        <div className="form-group">
                            <TextField
                                required
                                id="filled-full-width"
                                label="Contact Number"
                                variant="filled"
                                type="tel"
                                className="form-control"
                                name="contactNumber"
                                value={initialState.values.contactNumber}
                                onChange={initialState.handleChange}
                                style={{ margin: 8 }}
                                placeholder="Contact Number"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                               
                            />
                            
                        </div>
                        
                        <div className="form-group">
                            <TextField
                                required
                                id="filled-full-width"
                                label="Post ID"
                                variant="filled"
                                type="tel"
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

                        
                        <FormControl variant="filled" fullWidth required className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label">Post Office</InputLabel>
                            
                            <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            label="Post Office"
                            name="postOffice"
                            value={initialState.values.postOffice}
                            onChange={initialState.handleChange}
                            fullWidth 
                            >
                            
                            {postOffice.map((option)=> (
                                <MenuItem value={option.code}>{option.city}</MenuItem>
                            ))}
                            
                            </Select>
                           
                        </FormControl>
                        <div className="form-group">
                            <TextField
                                required
                                id="filled-full-width"
                                label="Issue"
                                variant="filled"
                                type="text"
                                className="form-control"
                                name="message"
                                value={initialState.values.message}
                                onChange={initialState.handleChange}
                                style={{ margin: 8 }}
                                placeholder="What issue did you experience?"
                                fullWidth
                                multiline
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                               
                            />
                            
                        </div>
                        <br/>
                            
                        <Button fullWidth type="submit"  variant="contained"color="primary" >Submit</Button>
                        <br/><br/>
                    </form>

                </Container>
        
        </>
     );
     
                            
    
}

export default ComplaintForm;