export default (uri) =>{

	let type

	const split_path = uri.split("/")	
	const filename = split_path[split_path.length-1]
	const splits = filename.split('.')
	const ext = splits[splits.length-1]

	if(ext == 'mp4' || ext == 'mov' || ext == 'webm'){

		type = `video/${ext}`
	}
	else if (ext == 'png' || ext == 'jpg' || ext == 'gif'){

		type = `image/${ext}`
	}
	else{

		return {error: 'Format Unsupported'}
	}

	return {filename, type}
}