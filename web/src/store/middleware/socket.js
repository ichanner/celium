import {io} from "socket.io-client"
import {setConnected, connectWS, errorWS} from "../app/actions"
import {CONNECT_WS, DISCONNECT_WS} from "../app/types"
import {JOIN_TRAIL} from "../board/trails/types"
import {SUBMIT_POST, EDIT_POST, DELETE_POST} from "../board/posts/types"
import registerPostListeners from "./listeners/posts"
import registerMemberListeners from "./listeners/members"

var socket;

const onConnect = (store)=>{

	console.log("WS CONNECTED")

	store.dispatch(setConnected(true))
}

const onDisconnect = (store, host, reason)=>{

	console.log("WS DISCONNECTED")

	if(reason == "io server disconnect"){
		
		store.dispatch(connectWS(host))	
	}		
	else{

	 	store.dispatch(setConnected(false))	
	}
}

const onError = (store) =>{
	
	store.dispatch(errorWS("Unable to connect"));
}

const wsMiddleware = store => next => action =>{

	const {focused_trail_id} = store.getState().trailSlice

	switch(action.type){

		case JOIN_TRAIL:

			socket.emit('/trails/join_trail', {trail_id: action.payload})

			break;
	
		case EDIT_POST:

			if(focused_trail_id != null){

				socket.emit('/trails/edit_post', action.payload)
			}
			
			break;

		case DELETE_POST:

			if(focused_trail_id != null){
			
				socket.emit('/trails/delete_post', action.payload)
			}
			
			break;


		case CONNECT_WS:

			const host = action.payload

			if(socket != null){

				socket.disconnect();
			}

			socket = io(host, {forceNew: true})
			socket.on("connect",  ()=>{onConnect(store)});
			socket.on("disconnect", (reason)=>{onDisconnect(store, host, reason)});
			socket.on("connect_error", ()=>{onError(store)});	
			
			registerMemberListeners(socket, store)
			registerPostListeners(socket, store)

			break;

		default:

			break;
	}

	return next(action)
}

export default wsMiddleware;
