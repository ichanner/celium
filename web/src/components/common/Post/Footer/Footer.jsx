import React from 'react'
import LikeButton from './LikeButton'
import BridgeButton from './BridgeButton'
import ReplyButton from './ReplyButton'
import './styles.css'


export default ({

		user_id, 
		likes, 
		bridges, 
		is_liked, 
		post_id, 
		username,
		bridged_post_id, 
	
	})=>{

	return(

		<div className='footer-container'>

			{ ( user_id != null ) ? 

				<>
					<LikeButton 

						likes={likes} 
						bridged_post_id={bridged_post_id}
						is_liked={is_liked} 
						post_id={post_id}
					/>

					<ReplyButton 

						post_id={post_id}
						username={username}
					/>

					<BridgeButton 

						post_id={post_id} 
						bridge_count={bridges}  
					/> 

				</> : null
			}

		</div>
	)
}