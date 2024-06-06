import React, {useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {removeAttachment} from "../../../../store/create/reducer"
import {mdiPlay, mdiCloseCircle} from '@mdi/js'
import Icon from '@mdi/react'
import "./styles.css"

export default ({attachment, index}) =>{

	const {format, id} = attachment
	const dispatch = useDispatch()
	const is_video = format.split('/')[0] == 'video'

	const handleRemove = useCallback(()=>{

		dispatch(removeAttachment(index))
	})

	return(

		<div className='preview-item-container'>

			<img className='preview-image' src={uri} />
			
			{ is_video ?

				<div className='play-button'>

					<Icon path={mdiPlay} size={1.5} color="white"/>

				</div> : null
			}

			<div onClick={handleRemove} className='remove-button'>

				<Icon path={mdiCloseCircle} size={1.2} color={'rgb(235, 0,0)'}/>

			</div> 

		</div>

	)	
} 