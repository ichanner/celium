import React, {useCallback} from 'react'
import {COLOR_SCHEME} from "../../../utils/constants"
import {handleAction} from '../../../store/app/popup/actions'
import {useDispatch} from 'react-redux'
import classNames from 'classnames'
import './styles.css'

export default ({label, is_dismiss, index})=>{

	const {LIGHT_BLUE} = COLOR_SCHEME
	const HEIGHT = window.screen.height 
	const dispatch = useDispatch()

	const classes = classNames({

		'popup-button': true,
		'popup-dismiss-button': is_dismiss
	})

	const onClick = useCallback(()=>{

		dispatch(handleAction(index))
	})

	return(

		<div className={classes} onClick={onClick}>

			<div className='popup-button-text'> {label} </div>

		</div>
	)
}