// Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom'; // If using react-router for navigation
import styled from 'styled-components';
import PngIcons from '../assets/icons/PngIcons';
import SvgIcons from '../assets/icons/SvgIcons';

const Navbar = () => {
  return (
    <div id='Nav-Main'>
      <div className='logo'>
        <img src={PngIcons.MainLogo} />
      </div>

      <div className='elements hidden md:flex'>
        <div className='elements-child' style={{ color: '#22C297' }}> <img src={PngIcons.Football} style={{ width: '24px', height: '24px' }} className="mr-4" />  Home</div>
        <div className='elements-child'> <SvgIcons.Favourite />  Favourites</div>
        <div className='elements-child'> <SvgIcons.Guess />  Guess</div>
        <div className='elements-child'> <SvgIcons.LeaderBoard /> LeaderBoard</div>
        <div className='nav-search'> <SvgIcons.SearchIcon /></div>
        <div className='nav-download'><SvgIcons.DownloadIcon />Download App</div>
        <div className='nav-login'>Login</div>
        <div> <img src={PngIcons.UK} /></div>
      </div>

    </div>
  );
};

export default Navbar;
