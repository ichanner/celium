import React, {useState, useEffect, useCallback, useRef} from 'react'
import {CREATION_STATES} from "../../../utils/constants"
import {useSelector, useDispatch} from 'react-redux'
import PreviewList from "./PreviewList/List"
import {setBody} from "../../../store/create/reducer"
import ReactDOM from 'react-dom';
import {selectAttachments, selectBody} from "../../../store/create/selectors"
import {createPost} from "../../../store/board/posts/actions"
import {selectReplying} from "../../../store/board/posts/selectors"
import Icon from '@mdi/react';
import {mdiPlusCircle, mdiSend} from '@mdi/js'
import './styles.css'

const {ASSETS, DEFAULT, BODY} = CREATION_STATES

export default()=>{

	const [creation_state, setCreationState] = useState(DEFAULT)

	const replying = useSelector(selectReplying)
	const attachments = useSelector(selectAttachments)
	const dispatch = useDispatch()
	const file_input = useRef(null)
	const text_input = useRef(null)
	const body = useSelector(selectBody)

	const onChangeText = useCallback((text)=>{

		dispatch(setBody(text))
	})

	useEffect(()=>{

		if(replying.post_id != null){

			dispatch(setBody(`@${replying.username} `))

			text_input.current.focus()
		}

	},[replying.post_id])

	useEffect(()=>{

		if(creation_state != BODY){

			text_input.current.blur()
		}

	},[creation_state])

	const onSubmit = useCallback(()=>{

		dispatch(createPost(true)).then(()=>{

			text_input.current.blur()
			text_input.current.value = ""
		})
	}) 

	return(


		<div className={'input-container'}>

			{ attachments.length > 0 ? 

				<PreviewList attachments={attachments}/> : null
			}

			<input type='file' id='file' ref={file_input} style={{display: 'none'}}/>

			<div className={'child-container'}>

				<Icon className='attach-icon' onClick={()=>{file_input.current.click()}} path={mdiPlusCircle} size={1.2} color="white" />

				<input 

					ref={text_input}
					defaultValue={body}
					multiline={true}
					className={'text-input'} 
					onChangeText={onChangeText}
					placeholder={`Send a reply`}
					placeholderTextColor={'#808080'}

				/>

				<Icon onClick={onSubmit} className='send-icon' path={mdiSend} size={1.2} color="white" />


			</div>

		</div>


	)
}

