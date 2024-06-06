/*
	
	Implementation inspiration from:
	
	URL: https://stackoverflow.com/questions/2782976/convert-facebook-date-format-to-javascript-date
	User: Clayton Graulx
*/

export default (date) =>{

	const seconds_since = Math.abs(Date.now() - date)/1000
	const days_since = Math.floor(seconds_since/86400)

	if(days_since == 0){

		if(seconds_since < 60){

			return "Just now"
		}
		else if(seconds_since < 120){

			return "A minute ago"
		}
		else if(seconds_since < 3600){

			return `${Math.floor(seconds_since/60)} minutes ago`
		}
		else if(seconds_since < 7200){

			return "A hour ago"
		}
		else if(seconds_since < 86400){

			return `${Math.floor(seconds_since/3600)} hours ago`
		}
	}
	else{

		if(days_since == 1){

			return "Yesterday"
		}
		else if(days_since < 7){

			return `${days_since} days ago`
		}
		else if(days_since < 31){

			return `${Math.ceil(days_since/7)} weeks ago`
		}
		else if(days_since < 62){

			return "A month ago"
		}
		else if(days_since < 365){

			return `${Math.ceil(days_since/31)} months ago`
		}
		else if(days_since < 730){

			return "A year ago"
		}
		else{

			return `${Math.floor(days_since/365)} years ago`
		}
	}	
}