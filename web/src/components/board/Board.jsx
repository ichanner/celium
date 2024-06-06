import React, {useRef, useEffect, useCallback, createContext} from 'react'
import {VariableSizeList as List} from 'react-window'
import Thread from "./Thread"
import "./styles.css"
import {POST_WIDTH_FACTOR, BOARD_GUTTER_SIZE, THREAD_GUTTER_SIZE} from "../../utils/constants"
import {useDispatch, useSelector} from 'react-redux'
import {getThread} from "../../store/board/posts/actions"
import {selectThreadIds} from "../../store/board/posts/selectors"
import axios from "../../api/index"
import InputBox from "./InputBox/InputBox"

const HEIGHT = window.screen.height 
const WIDTH = window.screen.width
const POST_WIDTH = (WIDTH*POST_WIDTH_FACTOR)+BOARD_GUTTER_SIZE

export default ()=>{

  const dispatch = useDispatch()
  const threads = useSelector(selectThreadIds)


  useEffect(()=>{

     dispatch(getThread('bd990c83-5d28-483b-941f-70eb47991209', 'thread_id'))

  }, [])


  if(threads.length == 0) return null;

	return (

      <>

  	    <List
              
          height={HEIGHT}
          width={WIDTH}
          itemCount={threads.length}
          itemSize={()=>POST_WIDTH}
          layout="horizontal"
        >

          {Thread}
              
       </List>
       <InputBox/>
      </>
	)
}
