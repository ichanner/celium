import React, {useRef, useEffect, useState, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setReplying} from "../../../../store/board/posts/actions"
import {isReplying} from "../../../../store/board/posts/selectors"
import {COLOR_SCHEME} from "../../../../utils/constants"
import Icon from '@mdi/react';
import {mdiReply} from '@mdi/js'
import "./styles.css"

const {LIGHT_BLUE, PRIMARY, POST_TEXT_PRIMARY, EBONY_CLAY} = COLOR_SCHEME

export default ({username, post_id}) =>{

	const dispatch = useDispatch()	
	const is_replying = useSelector(isReplying(post_id))
	const color = is_replying ? LIGHT_BLUE : POST_TEXT_PRIMARY

	const onClick = useCallback(()=>{

		dispatch(setReplying({post_id: post_id, username: username}))
	})

	return (

		<div onClick={onClick} style={{backgroundColor: EBONY_CLAY}} className='reply-button'>

			<Icon 

				path={mdiReply} 
				size={1.5} 
				color={color} 
			/>
		
		</div>
	)

}