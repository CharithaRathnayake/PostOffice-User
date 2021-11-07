import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {getDistance} from 'geolib';
import Button from '@material-ui/core/Button';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function DeliveryCalc(locations) {

    const [open, setOpen] = React.useState(true);
    console.log("deliveryF[0]location",locations.locations);
        var dis = getDistance(
            {latitude: locations.locations.location[0].location[locations.locations.location[0].location.length-1].location._lat, longitude: locations.locations.location[0].location[locations.locations.location[0].location.length-1].location._long},
            {latitude: locations.locations.location[0].destination.location._lat, longitude: locations.locations.location[0].destination.location._long}
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
        const handleClose = () => {
            setOpen(false);
          };
        
    return ( 
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
                            Post ID:{locations.locations.location[0].pid}<br/><br/>
                            Maximum number of days for delivery :{days}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                        Close
                        </Button>
                    </DialogActions>
                    </Dialog>
     );
     
}

export default DeliveryCalc;