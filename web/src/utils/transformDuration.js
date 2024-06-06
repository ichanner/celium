export default (seconds) =>{ //must be seconds

	let hours = Math.floor(seconds/3600)
	seconds = seconds%3600
	let minutes = Math.floor(seconds/60)
	if(minutes < 10 && hours > 0) minutes = `0${minutes}` 
	seconds = Math.floor(seconds%60)
	if(seconds < 10) seconds = `0${seconds}` 

	return `${hours}:${minutes}:${seconds}`
}