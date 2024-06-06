import config from "../config"

export default (id, format, end_point, quality=null) =>{
	
	return `${config.baseURL}/media/${end_point}/${id}?format=${format}&quality=${quality}`
	 
}