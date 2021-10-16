import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown.jsx';

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <>
      <nav className='navbar'>
      <div className='navbar-container'>
      <img 
            src="/App_Icon.png"
            style={{ width: 220, height: 80,color:"white" }}
            alt="Logo"
          />
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          {/* <li className='nav-item'>
            <Link
              to='/products'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              About
            </Link>
          </li> */}
          <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to='/'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Services <i className='fas fa-caret-down' />
            </Link>
            {dropdown && <Dropdown />}
          </li>
          
          <li className='nav-item'>
            <Link
              to='/complain'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Complaints
            </Link>
          </li>
          
        </ul>
        
      </div>
      </nav>
    </>
  );
}

export default Navbar;

