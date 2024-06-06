import {togglePopup} from './reducer'

export const handleAction = (index) => async(dispatch, getState) =>{

	const {popupSlice} = getState()
	const {inputs} = popupSlice
	const {callback} = inputs[index]
	
	dispatch(togglePopup())
		
	if(callback){

		callback()
	}
}

export {togglePopup}