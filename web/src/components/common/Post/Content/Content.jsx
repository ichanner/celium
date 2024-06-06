import React, {useState} from 'react'
import Grid from "./Grid/Grid"
import "./styles.css"

const MAX_CHARACTERS = 250

export default ({body, attachments, post_focused})=>{

	const [show_more, setShowMore] = useState(false)

	return(

		<div className='post-content-container'>

			{ body.length ? 

				<div> 

					<span className='post-text'> 

						{ show_more ? body : body.slice(0, MAX_CHARACTERS+1) } 

					</span> 

					{ (body.length > MAX_CHARACTERS ) ?

						<span onClick={()=>setShowMore(!show_more)} className='show-more-text'> 

							{ show_more ? "Show Less" :  "Show More" }

						</span> : null
					}	

				</div> : null
			}			

			{ attachments.length > 0 ? 
				
				<Grid attachments={attachments}/> : null
			}

		</div>
	)
}