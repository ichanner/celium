import React from 'react';
import { Route, Router, Routes, BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Board from '../../components/board/Board';
import NavButton from "./NavButton"
import {mdiHome, mdiAccount, mdiMagnify, mdiCog, mdiBell, mdiPlus} from '@mdi/js'
import logo from "../../assets/temp_logo.png"
import './styles.css'


const NavBar = () => {
  
  return (

    <>

      <div className='nav-bar-container'>

        <div className='nav-bar'>
          
         <NavButton to="/" icon={mdiHome} title={'Home'}/>

         <NavButton to="/profile" icon={mdiAccount} title={'Profile'}/>		

         <NavButton icon={mdiBell} title={'Notifications'} />

         <NavButton icon={mdiMagnify} title={'Search'}/>

         <NavButton icon={mdiCog} title={'Settings'} />

         <NavButton icon={mdiPlus} title={'New Thread'}/>
        
        </div>

        <div className='divider'/>

        <Routes>
          
          <Route path="/" element={<Board/>} />
        
          <Route path="/profile" element={Board} />

        </Routes>
  	  
      </div>
   
    </>
  	
  );
};

export default NavBar;