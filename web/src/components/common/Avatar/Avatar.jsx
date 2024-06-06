import React from 'react'
import config from "../../../config"

const WIDTH = window.screen.width

export default ({user_id})=>{


	return(

		<img 

			className='avatar' 
			style={{borderRadius: 50, width: '10%', height: '4%'}}
			src={`${config.baseURL}/user/${user_id}/avatar`}
		/>

	)
}