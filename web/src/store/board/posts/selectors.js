import {createSelector} from '@reduxjs/toolkit'
import {DEFAULT_KEY} from "../../../utils/constants"

const threads = (state) => state.postsSlice.threads
const focused_thread_index = (state) => state.postsSlice.focused_thread_index
const focused_post_index = (state) => state.postsSlice.focused_post_index
const bridge_state = (state) => state.postsSlice.bridge_state
const loading_state = (state) =>state.postsSlice.loading_state
const sort_keys = (state) => state.postsSlice.sort_keys
const section_id = (state) => state.postsSlice.section_id
const replying_id = (state) => state.postsSlice.replying.post_id
const replying = (state) => state.postsSlice.replying
const sections = (state) => state.postsSlice.sections 


export const isReplying = (post_id)=> createSelector(replying_id, (replying_id)=>{

	return (post_id==replying_id) 
})

export const selectReplying = createSelector(replying, (replying)=>replying)
export const selectThreads = createSelector(threads, (threads)=>threads)
export const selectFocusedThreadIndex = createSelector(focused_thread_index, (current_index)=>current_index)
export const selectFocusedPostIndex = createSelector(focused_post_index, (current_index)=>current_index)
export const selectThreadIds = createSelector(selectThreads, (threads)=>threads.map((thread)=>thread.id))
export const selectBridgeState = createSelector(bridge_state, (bridge_state)=>bridge_state)
export const selectBranchIndex = createSelector(threads, (threads)=>threads.findLastIndex(({prev_index})=>prev_index>0))
export const selectLoadingState = createSelector(loading_state, (loading_state)=>loading_state)
export const selectPostByIndex = (thread_index, post_index) => createSelector(threads, (threads)=>threads[thread_index]?.posts[post_index])
export const selectThreadByIndex = (thread_index) => createSelector(threads, (threads)=>threads[thread_index])
export const selectSection = (section_id) => createSelector(sections, (sections)=>{

	return sections[section_id]
})
export const selectFocusedSection = createSelector([focused_post_index, focused_thread_index, sections, threads], 

	(focused_post_index, focused_thread_index, sections, threads)=>{

	const {posts} = threads[focused_thread_index]
	const {section_id, inheritor_section_id, is_collapsed} = posts[focused_post_index]
	const focused_section_id = is_collapsed ? section_id : inheritor_section_id

	return sections[focused_section_id] 
})

export const selectPostIds = (thread_index) => createSelector(threads, (threads)=>{

	const thread = threads[thread_index]
	const thread_posts = thread ? thread.posts : []

	return thread_posts?.map(({post_id, unique_thread_id, is_top_cursor, parent_color, color, is_collapsed})=>{

		return {unique_thread_id, post_id, is_top_cursor, parent_color, color, is_collapsed}
	})
})

export const selectPostById = (thread_index, post_id) => createSelector(threads, (threads)=>{

	const index = threads[thread_index]?.posts.findIndex((post)=>{

		return (post.post_id==post_id)
	})

	return threads[thread_index].posts[index]
})

export const selectSortKey = () => createSelector([section_id, sort_keys], (section_id, sort_keys)=>{

	return sort_keys[section_id] || DEFAULT_KEY
})



//const section_id = (state) => state.postsSlice.section_id


//export const selectSectionId = createSelector(section_id, (section_id)=>section_id)

/*
export const selectPostIds = (thread_index) => createSelector(threads, (threads)=>{

	return threads[thread_index]?.posts.map(({id, section_id})=>{

		return {section_id, id}
	})
})
*/

/*
export const selectPostById = (thread_index, section, post_id) => createSelector(threads, (threads)=>{

	const index = threads[thread_index]?.posts.findIndex(({id, section_id})=>{

		return (id==post_id && section_id == section)
	})

	return threads[thread_index].posts[index]
})
*/


