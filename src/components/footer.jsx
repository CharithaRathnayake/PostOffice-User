import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
//import Feedback from "./Feedback";

function Footer() {
  return (
    <div className='footer-container'>
        <div class='footer-logo'>
            <h3>Post Office Management Information System</h3>
            <img 
            src="/App_Icon.png"
            style={{ width: 220, height: 80,color:"white" }}
            alt="Logo"
          />
        </div>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Contact Us</h2>
            <p><i class="far fa-envelope"></i>info.it@slpost.lk / slpostitdiv@gmail.com</p>
            <p><i class="fas fa-fax"></i>Fax: 011 4628130</p>
            <p><i class="fas fa-phone-alt"></i>Call Centre: 1950</p>
            <p><i class="fas fa-phone-alt"></i>TP: +94-112328301-3</p>
            <p><i class="fas fa-map-marker-alt"></i>No. 310, D.R.Wijewardena Mawatha,Colombo 01000, Sri Lanka</p>            
          </div>

          <div class='footer-link-items'>
            <h2>Explore</h2>
            <Link to='/'>Home</Link>
            <Link to='/'>About Us</Link>
            <Link to='/'>Services</Link>
            <Link to='/complain'>Complaints</Link>
          </div>
          
          
        </div> 
      </div>
    </div>
  );
}

export default Footer;
