import React, {useRef, useEffect, useState, useCallback} from 'react'
import {useDispatch} from 'react-redux'
import truncateNumber from "../../../../utils/truncateNumber"
import {updateLikes} from "../../../../api/posts"
import Icon from '@mdi/react';
import {mdiThumbUp, mdiThumbUpOutline} from '@mdi/js'
import './styles.css'


export default ({likes, is_liked, post_id, bridged_post_id}) =>{

	const dispatch = useDispatch()
	const [liked, setIsLiked] = useState(is_liked)
	const [is_animating, setIsAnimating] = useState(false)
	const [like_count, setLikeCount] = useState(likes) 
	const icon_path = liked ? mdiThumbUp : mdiThumbUpOutline

	const onClick = async()=>{

		if(!liked){

			setIsAnimating(true)
			
			setTimeout(()=>{

				setIsAnimating(false)
			
			},300)
		}

		const new_like_count = !liked ? (like_count +1) : (like_count -1)

		setIsLiked(!liked)
		setLikeCount(new_like_count)

		await updateLikes(post_id, bridged_post_id)
	}

	return (

		<div onClick={onClick} className={`stat-container ${is_animating ? 'like-animation' : ''}`}>

			<Icon 
 
				path={icon_path}
				size={.9} 
				color={'white'} 
			/>

			<div className='stat-text'>{truncateNumber(like_count)}</div>

		</div>
	)

}