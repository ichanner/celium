import {
	CONNECT_WS, 
	CLEAR_ERROR, 
	DISCONNECT_WS, 
	SET_ERROR, 
	SET_CONNECTED
} from "./types";

import {Action} from "../../utils/formats"

export const setError = (error_msg="An Error Occured") =>{

	return(dispatch)=>{

		dispatch(Action(SET_ERROR, error_msg))
	}
}		

export const clearError = () =>{

	return(dispatch)=>{

		dispatch(Action(CLEAR_ERROR))
	}
}

export const connectWS = (host) =>{

	return (dispatch)=>{

		dispatch(Action(CONNECT_WS, host))
	}	
}

export const disconnectWS = () =>{

	return (dispatch)=>{

		dispatch(Action(DISCONNECT_WS))
	}	
}

export const errorWS = (error_msg="Unable to connect") =>{

	return Action(SET_ERROR, error_msg)
}

export const setConnected = (connected) =>{

	return Action(SET_CONNECTED, connected)
}
