import React, {useCallback} from 'react'
import getUri from "../../../../../utils/getUri"
import Icon from '@mdi/react';
import {mdiPlay} from '@mdi/js'
import Attachment from "../../../Attachment/Attachment"
import "./styles.css"

export default ({format, id, is_processing, should_expand, onClick}) =>{

	const is_video = format.split('/')[0] == 'video'
	const preview_uri = getUri(id, format, 'preview')
	const grid_item_class = should_expand ? 'grid-item-large' : ''

	return(

		<div className={grid_item_class}>

			<Attachment  

				id={id}
				onClick={onClick}
		        format={format}
		        is_processing={is_processing}
		        is_fullscreen={false}
			/>
			
			{ is_video ?

				<div className='play-button'>

					<Icon path={mdiPlay} size={1} color="white" />

				</div> : null
			}

		</div>
	)	
} 