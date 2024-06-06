import React from 'react'
import Preview from "./Preview"
import "./styles.css"

export default ({attachments}) =>{

	return(

	    <div className={'asset-preview-container'} >

			{
				attachments.map((attachment, index)=>{

					return <Preview attachment={attachment} index={index}/>
				})
			}

		</div> 
		
	)
}