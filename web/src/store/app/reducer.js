import {
	CONNECT_WS, 
	CLEAR_ERROR, 
	DISCONNECT_WS, 
	SET_ERROR, 
	SET_CONNECTED
} from "./types";

const initialState = {

	error: null,
	connected: false
}

const setConnected = (state, is_connected) =>{

	return {

		...state,
		connected: is_connected,
		error: is_connected ? null : state.error
	}
}

const setError = (state, error) =>{

	return {

		...state,
		error: error
    }
}

export default(state=initialState, action) =>{

	switch(action.type){

		case SET_CONNECTED:

			return setConnected(state, action.payload)

			break;

		case CLEAR_ERROR:

			return setError(state, null)

			break;

		case SET_ERROR:

			return setError(state, action.payload)

			break;

		default:

			return state;

			break;
	}
}