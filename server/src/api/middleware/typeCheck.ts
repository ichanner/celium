
export const queryParse = (req, res, next) =>{

	const query = req.query

	for(let key in query){

		if(query[key] == 'null'){

			query[key] = null
		}
		else if(!isNaN(query[key])){

			query[key] = Number(query[key])
		}
		else if(query[key] == 'false' || query[key] == 'true'){

			query[key] = (query[key] === 'true')
		}
	}

	next()
}

export const bodyParse = (req, res, next) =>{

	const body = req.body

	for(let key in body){

		if(body[key] == 'null'){

			body[key] = null
		}
		else if(!isNaN(body[key])){

			body[key] = Number(body[key])
		}
		else if(body[key] == 'false' || body[key] == 'true'){

			body[key] = (body[key] === 'true')
		}
	}

	next()
}