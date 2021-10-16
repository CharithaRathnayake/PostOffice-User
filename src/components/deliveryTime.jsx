import React from 'react';
import {getDistance} from 'geolib';


import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


export default function DeliveryTime (dest_lat,dest_long,start_lat,start_long,pid){ 
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const state = {  
        destinationLat: dest_lat,
        destinationLong: dest_long,
        startLat:start_lat,
        startLong:start_long
    };
    
    var dis = getDistance(
        {latitude: state.startLat, longitude: state.startLong},
        {latitude: state.destinationLat, longitude: state.destinationLong},
    );
    
    const distance= dis/1000;
    var day='0';
    if (distance<50){
        day='1';
    }else if(distance<200){
        day='2'
    }else{
        day='3'
    }
          
    
    return(
        <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h1" className={classes.title} color="textSecondary" gutterBottom>
          Estimated Delivery Time
        </Typography>
        
        <Typography variant="body1" className={classes.pos} color="textSecondary">
         {bull} PID:{pid}
        </Typography>
        <Typography variant="body1" className={classes.pos} color="textSecondary">
         {bull} Delivery Time:{day} days
        </Typography>
      </CardContent>
    </Card>
  );

    
}