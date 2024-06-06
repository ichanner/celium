import axios from "./index"
import config from "../config.js"


export const searchTopics = async(query) =>{

	const {data} = await axios().get(`/topic/search?query=${query}`)

	return data
}

export const fetchTopics = async()=>{

	const {data} = await axios().get(`/topic/recommended`)

	return data
}