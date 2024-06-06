import React from 'react'

export default () =>{

	return(

		<div className='bridge-divider-container'>
			
			<div 

				className='bridge-divider-arc' 
				style={{borderTopLeftRadius:20, borderLeftWidth: 1, borderBottomLeftRadius:1}} 
			/>
	          
	          <span className=''>Bridger Comment</span>
	       
	       <div 

	       		className='bridge-divider-arc' 
	       		style={{borderTopRightRadius:20, borderRightWidth: 1, borderBottomRightRadius:1}}
	       	/>
		
		</div>
	)
}