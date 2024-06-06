export default (text, max=10)=>{

	if(!text) return;

	return text.slice(0, max) + ((text.length > max) ? "..." : "")
}