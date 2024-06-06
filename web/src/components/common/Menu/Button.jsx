import React from 'react'
import Icon from '@mdi/react';

export default ({callback, label, icon}) =>{

	const styles = {

		label: {

			color: 'white',
			paddingLeft: '6%',
			fontSize: '1rem',
		}
	}

	return (

		<div className="menu-button-container" onClick={callback} >

			<Icon path={icon} size={0.8} color={'white'}/>

			<span style={styles.label}>{label}</span>

		</div>
	)
}