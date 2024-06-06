import {toggleMenu} from "./reducer"


export const handleAction = (button_index) => async(dispatch, getState) =>{

	const {menuSlice} = getState()
	const {buttons} = menuSlice
	const {callback} = buttons[button_index]
	
	dispatch(toggleMenu())
	callback()
}

export {toggleMenu}