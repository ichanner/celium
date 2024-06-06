import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import NavBarRouter from "./NavBar/NavBar";
import Popup from '../components/common/Popup/Popup';

const Router = () => {
  
  return (

  	<div>

	  	<BrowserRouter>

	  		<NavBarRouter/>

	  	</BrowserRouter>

	  	<Popup/>

	</div>

  );
};

export default Router;