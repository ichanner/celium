
export const PopupButton = (label, is_dismiss=false, callback=null) =>{

	return {label, is_dismiss, callback}
}

export const PopupTextBox = (placeholder, callback)=>{

	return {placeholder, callback}
}

export const MenuButton = (label, icon, callback, hidden=false)=>{

	return {label, icon, callback, hidden}
}

export const Attachment = (uri, name, type) =>{

	return{

		uri: uri,
		name: name,
		type: type,
		format: type
	}
}

export const Action = (type, payload)=>{

	return {type, payload}
}