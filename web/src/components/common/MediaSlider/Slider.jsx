import React, {useState, useEffect, useRef, useCallback} from 'react'
import Icon from '@mdi/react';
import {mdiArrowLeft, mdiArrowRight} from '@mdi/js'
import Modal from 'react-modal'
import Attachment from "../Attachment/Attachment"
import {debounce} from 'lodash'
import './styles.css'

export default ({is_open, attachments, initial_index, closeSider}) =>{

	if(!is_open) return null

	const rightButton = useRef(null)
	const leftButton = useRef(null)
	const show_arrows = attachments.length > 1
	const [focused_index, setFocusedIndex] = useState(initial_index)

	const moveLeft = () =>{

		if(focused_index != 0){

			setFocusedIndex(focused_index-1)
		}
		else{

			setFocusedIndex(attachments.length-1)
		}
	}

	const moveRight = () =>{

		if(focused_index != attachments.length-1){

			setFocusedIndex(focused_index+1)
		}
		else{

			setFocusedIndex(0)
		}
	}

	const onClick = useCallback(({target})=>{

		if((!rightButton.current?.contains(target) && !leftButton.current?.contains(target))){

			closeSider()
		}
	})

	const onKeyDown = debounce(({key}) => {

		if(key == "ArrowLeft"){

			moveLeft()
		}
	   else if(key == "ArrowRight"){

			moveRight()
		}

	}, 100)

	useEffect(()=>{

	    window.addEventListener('keydown', onKeyDown)

	    return()=>{
	
	    	onKeyDown.cancel()

	    	window.removeEventListener('keydown', onKeyDown)
	    }

		
	},[focused_index, attachments, is_open])

	return(

		<div onClick={onClick}>
		
			<Modal className='modal' overlayClassName='modal-overlay' onRequestClose={closeSider} isOpen={is_open}>

				{ show_arrows ? (

					<Icon 

						ref={leftButton}
						onClick={moveLeft} 
						className='arrow' 
						path={mdiArrowLeft} 
						color={'white'} 
						size={1.2}
					/> 

				) : null }
				
				<Attachment {...attachments[focused_index]} is_fullscreen={true}/>

				{ show_arrows ? (

					<Icon 

						ref={rightButton}
						onClick={moveRight} 
						className='arrow' 
						path={mdiArrowRight} 
						color={'white'} 
						size={1.2}
					/> 

				) : null }

			</Modal>

		</div>


	)
}