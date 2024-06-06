import React, {useRef, useCallback, useEffect} from 'react'
import Button from "./Button"
import './styles.css'

export default ({inputs, closeMenu}) =>{

	const menuRef = useRef(null)

	useEffect(()=>{

		const onClick = (event)=>{
			
			if(menuRef.current && !menuRef.current.contains(event.target)){

				closeMenu()
			}
		}

		setTimeout(()=>window.addEventListener("click", onClick), 100)

		return()=>{

			window.removeEventListener('click', onClick)
		}

	}, [])

	return(
		
			<div ref={menuRef} className='menu-container'>

				{
					inputs.map((input, i)=>{

						const {label, icon, callback} = input

						return (

							<Button key={i} callback={callback} label={label} icon={icon}/>
						)
					})
				}

			</div>
	)
}