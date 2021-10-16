import './App.css';
import Navbar from './components/Navbar';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Complaint from './components/pages/Complain/complaint';
import Footer from './components/footer';
import Track from './components/pages/Track/tracking';
import DeliveryTime from './components/pages/DeliveryTime/checkDT';

function App (){
  return (
    <>
      <Router>
        <Navbar/>
        <br/>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/complain' exact component={Complaint}/>
          <Route path='/track' exact component={Track}/>
          <Route path='/deliverytime' exact component={DeliveryTime}/>
        </Switch>
        <br/>
        <Footer/>
      </Router>
    </>
  )
}
  
export default App;
