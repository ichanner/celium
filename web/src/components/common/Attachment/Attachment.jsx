import React, {useCallback, useState} from 'react'
import Video from './Video'
import {useDispatch, useSelector} from 'react-redux'
import config from "../../../config"
import getUri from "../../../utils/getUri"
import "./styles.css"


export default ({format, is_focused, id, onClick, is_fullscreen, is_processing}) =>{

	const dispatch = useDispatch()
	const is_video = format.split('/')[0] == 'video'	
	const content_uri = getUri(id, format, '', 'high')
	const image_class_name = is_fullscreen ? 'fullscreen-image' : 'minimized-image'

	if(is_processing) return <div> Loading... </div>

	return(

		<div onClick={onClick}>
	
			{ (is_video) ?  

				<Video/> : <img className={image_class_name} src={content_uri}/>
			}

		</div>
	)
}


/*

	const handlePress = ()=>{

		if(!is_fullscreen){

			const attachment = {id, format, is_processing}

			dispatch(toggleFullScreen({new_attachments: [attachment], index: 0}))
		}		
	}


*/