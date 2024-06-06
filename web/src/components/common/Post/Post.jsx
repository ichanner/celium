import React from 'react'
import "./styles.css"
import PostHeader from "./Header/Header"
import PostFooter from "./Footer/Footer"
import PostContent from "./Content/Content"
import {POST_WIDTH_FACTOR, COLOR_SCHEME} from "../../../utils/constants"
//import ReplyIndicator from './ReplyIndicator'

const WIDTH = window.screen.width

export default ({current_color, post, is_preview}) =>{

	return(

		<div className='post-container' style={{ 

			borderTop: `2px solid ${current_color}`, 
			borderLeft: `1px solid ${current_color}`, 
			width: (WIDTH*POST_WIDTH_FACTOR),
			pointerEvents: is_preview ? 'none' : 'auto'
		}}>

			<PostHeader {...post} color={current_color}/>

			<PostContent {...post} />

			<PostFooter {...post}/>

		</div>

	)
}


/*

			{ replied_post_content ?

				<ReplyIndicator {...replied_post_content}/> : null 
			}

<PostContent 

					body={body} 
					attachments={attachments} 
					post_focused={is_focused}
				/>

				{ bridger_post_content?.comment ? 

					<BridgedComment {...bridger_post_content} /> : null
				}
				
				<PostFooter 

					user_id={user_id}
					is_dummy={is_dummy}
					likes={likes}
					username={username} 
					bridges={bridges}
					is_liked={is_liked}
					inheritor_thread_id={inheritor_thread_id}
					is_focused={is_focused}
					post_id={post_id}
					reference_post_id={reference_post_id}
				/>

				*/
