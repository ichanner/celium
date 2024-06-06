import React, {lazy, useEffect, useRef, useState, Suspense} from 'react'
import Modal from 'react-modal'
import {COLOR_SCHEME} from "../../../utils/constants"
import Button from "./Button"
import {useSelector, useDispatch} from 'react-redux'
import {togglePopup} from "../../../store/app/popup/actions"
import {selectLabel, selectComponent, selectInputs, selectPrompt, selectIsOpen} from "../../../store/app/popup/selectors"
import './styles.css'

const {POST_TEXT_PRIMARY, POST_TEXT_SECONDARY, EBONY_CLAY, POST_BODY} = COLOR_SCHEME
const HEIGHT = window.screen.height
const WIDTH = window.screen.width

const popup_components = {

	'post': '../Post/Post.jsx',
	'bridge': './Components/BridgePreview.jsx'
}

export default ()=>{

	const is_open = useSelector(selectIsOpen)
	const label = useSelector(selectLabel)
	const inputs = useSelector(selectInputs)
	const prompt = useSelector(selectPrompt)
	const component = useSelector(selectComponent)
	const dispatch = useDispatch()

	const ChildComponent = () =>{

		if(component){

			const {name, props} = component
			const Child = lazy(() => import(popup_components[name]));
			
			return (	

				<Suspense fallback={()=><div> Loading... </div>}>

					<Child {...props} />

				</Suspense>
			)
		}
		else{

			return null
		}
	}

	if(!is_open) return null

	return(

		<Modal className={'popup-modal'} onRequestClose={()=>dispatch(togglePopup())} overlayClassName={'popup-modal-overlay'} isOpen={is_open}>
			
			<div className={'popup-container'} style={{width: WIDTH*0.3}}>

				<div className={'popup-label'}>{label} </div>
				
				<div className={'popup-prompt'}>{prompt}</div>
				
				<div className={'popup-component-container'} style={{maxHeight:HEIGHT/3}}>
						
					<ChildComponent/>
				
				</div>

				<div className='popup-inputs-container'>

					{
						inputs?.map((input, index)=>{

							const {label, is_dismiss} = input

							return(

								<Button 

									index={index} 
									is_dismiss={is_dismiss} 
									label={label}
								/>
							)
						})	
					}
				</div>

			</div>


		</Modal>
	)
}