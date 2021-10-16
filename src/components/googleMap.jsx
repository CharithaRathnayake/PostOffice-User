import React from 'react';
import '../../../App.css';
import PostInfoForm from '../../FormDialog';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Container } from '@mui/material';
//import map from "../../../images/map.jpg"


function Track() {
    const mapStyles = {        
        height: "100vh",
        width: "100%"};
      
      const defaultCenter = {
        lat: 6.927079, lng: 79.861244
      }
      
    return ( 
        <>
        <Container>
            
            <PostInfoForm 
            title={"Track Your Post"}/>    
        </Container>
         
         <br/>
        <LoadScript
            googleMapsApiKey='AIzaSyC1yEuCzdrETdnciayw9X8t246drbCJ51M'>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter}
            >
                <Marker position={{ lat: 6.927079, lng: 79.861244,}} name="My Post" />
            </GoogleMap>
        </LoadScript>
           
            
        </>
     );
}

export default Track;
