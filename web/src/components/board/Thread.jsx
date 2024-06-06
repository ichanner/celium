import React, {useRef, useState, useMemo, useCallback, createContext} from 'react'
import {VariableSizeList as List} from 'react-window'
import useWindowSize from "../../utils/useWindowSize"
import Post from "../common/Post/Wrapper"
import {useSelector, useDispatch} from 'react-redux'
import {selectPostIds} from "../../store/board/posts/selectors"
import {POST_WIDTH_FACTOR, BOARD_GUTTER_SIZE, THREAD_GUTTER_SIZE} from "../../utils/constants"
import { animated } from '@react-spring/web'

const HEIGHT = window.screen.height 
const WIDTH = window.screen.width
const POST_WIDTH = WIDTH*POST_WIDTH_FACTOR

export const ThreadContext = React.createContext({});

export default ({index: thread_index, style})=>{

	const postHeights = useRef({})
  const list = useRef(null)
  const posts = useSelector(selectPostIds(thread_index))
  const [windowWidth] = useWindowSize();


  const setPostHeight = (index, height)=>{
   
    list.current?.resetAfterIndex(0);
   
    postHeights.current = {...postHeights.current, [index]: height}
  }  

	const getPostHeight = useCallback((index)=>{

		return (postHeights.current[index]) || 100
	
  },[])

  const footer = useMemo(()=>{

    return (HEIGHT-getPostHeight(posts[posts.length-1]))/2

  }, [posts]) 

	return (

        <div key={thread_index} style={{...style,  width: style.width+(WIDTH*POST_WIDTH_FACTOR),  marginLeft: '1%'}}>

            <ThreadContext.Provider value={{windowWidth, setPostHeight}}>  

              { posts.length > 0 ? (

            	    <List
                    
                    ref={list}
                    height={HEIGHT}
                    width={POST_WIDTH}
                    itemCount={posts.length}
                    itemSize={getPostHeight}
                    style={{overflowX: 'hidden'}}
                  >
                   
                   {({index, style})=>{

                        const {post_id} = posts[index]
  
                        return(

                           <animated.div key={`${post_id}${thread_index}`} style={{...style, width: style.width + BOARD_GUTTER_SIZE, height: `${parseFloat(style.height) + footer}px`}}>

                             <Post thread_index={thread_index} post_id={post_id} index={index}/>

                           </animated.div>
                        )
                   }}
                        
                 </List>

              ) : null }

            </ThreadContext.Provider>
      
         </div>
	)
}
