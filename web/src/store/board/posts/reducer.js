import {createSlice} from '@reduxjs/toolkit'
import BridgeState from "./utils/BridgeState"
import {LOADING_STATES, DIRECTIONS} from "../../../utils/constants"
import {v1 as uuid} from 'uuid'
import Thread from "./utils/Thread"
import getFocusedPost from "./utils/getFocusedPost"
import mapPosts, {Post} from "./utils/mapPosts"
import appendPost from "./utils/appendPost"
import updatePosts from "./utils/updatePosts"

const {BOTTOM_LOADING, TOP_LOADING} = LOADING_STATES
const {TOP, DOWN, INITIAL} = DIRECTIONS  

const updateNestedPost = (posts, post_id, callback) => {

	if(!posts || posts.length == 0) return [];

    return posts.map((post) => {
        
        if (post.id === post_id) {

        	const new_fields = callback(post);
 	                    
            return { ...post, new_fields}
        }
       
        return { ...post,

            children: updateNestedPosts(post.children, post_id, callback)
        }
    
    });
}

const updateSection = (sections, focused_section_index, new_fields) => {

	const focused_section = sections[focused_section_index];

	return [

		...sections.slice(0, focused_section_index),

		{
			...focused_section, ...new_fields
		},

		...sections.slice(focused_section_index + 1)
	]
}


const postsSlice = createSlice({

	name: 'postsSlice',
	
	initialState: {

		sections:[], 
		loading_replies: {},
		focused_section_index: 0,
		focused_post_index: 0,
		replying: {post_id: null, username: null},	
		error: null,

	},
	
	reducers:{

		setFocusedSectionIndex: (state, action)=>{

			state.focused_section_index = action.payload;
		},

		setReplying: (state, action)=>{

			state.replying = action.payload
		},

		addSection: (state, action)=>{

			let initial_post_index = 0; 

			const { sections, focused_section_index } = state;
			const { new_posts, initial_post_id } = action.payload;

			if(initial_post_id != null){

				initial_post_index = new_posts.findIndex(({id})=>id==initial_post_id)
			}
            
			state.sections = [ 

				...sections.slice(0, focused_section_index + 1), 
					
					Section(new_posts), 
				
				...sections.slice(focused_section_index + 1)
			]
			
			state.focused_section_index = focused_section_index + 1;
			state.focused_post_index = initial_post_index;

		},


		//Add Posts (When adding posts to the section and not a parent post because the parent post is not in the section)
		addPosts : (state, action)=>{

			const { new_posts, parent_post_id, direction } = action.payload;
		    const { sections, focused_section_index } = state;

		    let updated_posts = [];

		    if(direction == TOP){

		    	const parent_post_index = new_posts.findIndex((post)=>post.id == parent_post_id);

		    	if(parent_post_index < 0){

		    		// No parent post found in new posts, prepend new posts to the section
		    		
		    		updated_posts = [...new_posts, ...sections[focused_section_index].posts];
		    	}
		    	else{

		    	    // Parent post found in new posts, reparent existing posts

		    		updated_posts = [ 

		    			...new_posts.slice(0, parent_post_index), 

		    			{
	    					...new_posts[parent_post_index],

	    					children:[

	    						...new_posts.slice(parent_post_index + 1),

	    						...sections[focused_section_index].posts
	    					]
		    			}
		    		];
		    	}
		    	
		    }
		    else{

		    	// Direction is not "TOP", append new posts to the section

		    	updated_posts = [...sections[focused_section_index].posts, ...new_posts];	    	
		    }

		    state.sections = updateSection(sections, focused_section_index, { 

		    	posts: updated_posts, loading_state: null  
		    });

		},

		//Add Replies (When adding posts to a known parent in the section)
		addReplies : (state, action)=>{

			const { new_posts, last_loaded_child_id, parent_post_id } = action.payload;
		    const { sections, loading_replies, focused_section_index } = state;
		   
		   	const updated_posts = updatedNestedPost(sections[focused_section_index].posts, parent_post_id, (post) => {
			    
			    let child_index = -1;

			    if(last_loaded_child_id != null){

			    	child_index = post.children.findIndex((child) => child.id === last_loaded_child_id);
			    }

			    return {

			    	children: [
			        	
			        	...post.children.slice(0, child_index + 1),
			       		...new_posts,
			        	...post.children.slice(child_index + 1),
			      ],
			   
			    };
			
			});

		    const updated_sections = updateSection(sections, focused_section_index, { posts: updated_posts });
		  
		    state.sections = updated_sections;
		    state.loading_replies = { ...loading_replies, [parent_post_id]: null }; 
		},

		toggleCollapse : (state, action)=>{

			const { parent_post_id } = action.payload;
			const { sections, focused_section_index } = state;
			
			const updated_posts = updateNestedPost(sections[focused_section_index].posts, parent_post_id, 

				(post)=>({

	    			is_collapsed: !post.is_collapsed
	    		})
	    	)

	    	const updated_sections = updatePost(sections, focused_section_index, { posts: updated_posts })

		    state.sections = updated_sections;
		},

		setPostProcessed: (state, action) =>{

			const {attachment_id, post_id} = action.payload;
			const {sections, focused_section_index} = state;
			
			const updated_posts = updateNestedPost(sections[focused_section_index].posts, post_id, 

				(post)=>({

					attachments: post.attachments.map((attachment)=>{

						if(attachment.id == attachment_id){

							return {...attachment, is_processing: false}
						}

						return attachment
					})
				})
			)

			const updated_sections = updateSection(sections, focused_section_index, { posts: updated_posts })

			state.sections = updated_sections;
		},
      
		removePost: (state, action) =>{

			const removed_post_id  = action.payload;
			const { sections, focused_section_index } = state;
			
			const updated_posts = updateNestedPost(sections[focused_section_index].posts, removed_post_id, 

				(post)=>({

					user_id: null, 
					username: '[Deleted]', 
					body: '[Deleted]',	
					attachments: []

				})
			);

			const updated_sections = updateSection(sections, focused_section_index, { posts: updated_posts });
			
			state.sections =  updated_sections;
		},

		setPostContent: (state, action) =>{

			const {focused_section_index, sections} = state
			const {new_body, removed_attachments, edited_post_id} = action.payload
		
			const updated_posts = updateNestedPost(sections[focused_section_index].posts, edited_post_id, 

				(post)=>({

					body: new_body,	
					edit_date: Date.now(),
					attachments: post.attachments.filter(({id})=>!removed_attachments.includes(id))

				})
			);

			const updated_sections = updateSection(sections, focused_section_index, { posts: updated_posts });
			
			state.sections = updated_sections;
		}
	}
})

export const { 

	setFocusedSectionIndex,
	setReplying,
	setSortKey,
	addSection,
	addPosts,
	addReplies,
	toggleCollapse,
	setPostProcessed,
	removePost,
	setPostContent


} = postsSlice.actions

export default postsSlice.reducer

