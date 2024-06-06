import React from 'react'
import truncateText from "../../../../utils/truncateText"

export default ({color, title}) =>{

	return (

		<div className='title-container' style={{backgroundColor: color}}>

			<span className='title-text'>{truncateText(title, 20)}</span>

		</div> 
	)
}