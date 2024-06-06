//@ts-nocheck

export default(schema) =>{

	return (req, res, next) =>{
			
		const {error} = schema.validate(req.query)

		if(error){

			next(error)
		}
	
		next()
	}
}