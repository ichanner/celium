import React, {useRef, useEffect, useState, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {COLOR_SCHEME} from "../../../../utils/constants"
import truncateNumber from "../../../../utils/truncateNumber"
import {selectBridgeState} from '../../../../store/board/posts/selectors'
import {bridgePosts, initializeBridge} from '../../../../store/board/posts/actions'
import {togglePopup} from "../../../../store/app/popup/actions"
import {PopupButton} from "../../../../utils/formats"
import Icon from '@mdi/react';
import {mdiLinkVariant, mdiLinkVariantPlus} from '@mdi/js'
import "./styles.css"

export default ({bridge_count, thread_id, post_id, is_focused}) =>{

	const dispatch = useDispatch()
	const {
		is_active, 
		from_thread_index, 
		from_post_index, 
		from_color
	} = useSelector(selectBridgeState)
	
	const color = is_active ? from_color : COLOR_SCHEME.POST_TEXT_PRIMARY
	const icon_path = is_active ? mdiLinkVariantPlus : mdiLinkVariant  
	const icon_size = is_active ? 1 : .9
	
	const onPress = useCallback(()=>{

		if(is_active){

			dispatch(
				
				togglePopup({

					label: 'Bridge Threads',
					prompt: "Do you want to bridge these two threads?",
					component:{
						
						name: 'bridge', 
						props: {from_thread_index, from_post_index}
					},
					inputs: [

						PopupButton('Bridge Threads', false, async()=>{

							await dispatch(bridgePosts(thread_id, post_id))
						}), 

						PopupButton('Bridge with Comment', false, ()=>{

							navigation.navigate('Create', {type: 'bridge', to_post_id: post_id, to_thread_id: thread_id})
						}),
						
						PopupButton('Cancel',  true)
					]
				})
			)
		}
		else{
			
			dispatch(initializeBridge())
		}

	})

	return (

		<div className='stat-container'>

			<Icon 

				path={icon_path}
				size={icon_size} 
				color={color} 
			/>

			{ !is_active ? <div className='stat-text'>{truncateNumber(bridge_count)}</div> : null }

		</div> 

	)

}