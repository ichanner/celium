import React, {useRef, useContext, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {ThreadContext} from "../../board/Thread"
import {selectPostById, selectSection} from "../../../store/board/posts/selectors"
import Post from "./Post"

const HEIGHT = window.screen.height
const DIVIDER_HEIGHT = HEIGHT*0.04

export default ({index, thread_index, post_id}) =>{

	const postRef = useRef(null)
	const post = useSelector(selectPostById(thread_index, post_id))
	const {section_id, is_collapsed, color} = post
	const section = useSelector(selectSection(section_id))
	const current_color = is_collapsed ? section.color : color
	const {setPostHeight, windowWidth} = useContext(ThreadContext)

	useEffect(()=>{

		setPostHeight(index, postRef.current.getBoundingClientRect().height)

	}, [windowWidth])

	return (

		<div className='post-wrapper-container' ref={postRef}>

			<Post post={post} current_color={current_color}/>

			<div style={{backgroundColor: current_color, width: '1%', height: DIVIDER_HEIGHT}}/>

		</div>
	)
}