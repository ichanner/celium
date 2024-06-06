

export default async(req, res, next)=>{

	try{

		const {id} = req.params
		const {format, quality} = req.query

		if(!id || !format){

			throw new Error('Not Found')
		} 
		else{

			const [type, ext] = format.split('/')

			if(type == 'video' && !quality){

				throw new Error('Invalid Request')
			}
			else{

				next()
			}
		}
	}
	catch(err){

		next(err)
	}
}