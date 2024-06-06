import React from 'react'
import Icon from '@mdi/react';
import {useNavigate} from 'react-router-dom';

export default({to, title, icon})=>{

	const navigate = useNavigate()

	const onClick = () =>{

		navigate(to)
	}

	return(

		<div className='nav-tab' onClick={onClick}>
		    
			<Icon path={icon} size={1.2} color='white'/>

		  	<span className='nav-tab-text'> {title} </span>

		</div>
	)
}