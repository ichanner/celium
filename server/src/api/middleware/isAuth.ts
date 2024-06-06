
export default async(req, res, next) =>{

	try{
		
		//req.isAuthenticated()
		
		if(true){

			req.user = {user_id:'123'}
			
			next()
		}
		else{

			throw new Error('Unauthorized')
		}
	}
	catch(err){

		next(err)
	}
}