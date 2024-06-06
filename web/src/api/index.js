import Axios from 'axios'
import config from "../config.js"
import store from "../store/index"
import {togglePopup} from "../store/app/popup/actions"
import {PopupButton} from "../utils/formats"

const {baseURL} = config

const instance = Axios.create({

	baseURL: baseURL,
	timeout: 5000,
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
    'Access-Control-Max-Age': '86400',
  },
})

instance.interceptors.request.use(function (config) {
    
    return config;
  
  }, function (error) {
 	
 	store.dispatch(togglePopup({

 		label:"Error", 
 		prompt: 'Unable to proccess your request', 
 		inputs: [PopupButton('Ok', true)] 
 	}))
 
 });

instance.interceptors.response.use(function (response) {

    return response;
  
  }, function (error) {

  	store.dispatch(togglePopup({

 		label:"Server Error", 
 		prompt: 'A server error occurred', 
 		buttons: [PopupButton('Ok', {}, true)] 
 	}))
    
  });

export default (token=null) =>{

	instance.defaults.headers.common['Authorization'] = `Bearer ${token}`

	return instance;
}
