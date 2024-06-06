
export default (cursor_id, cursor_value)=>{

	return btoa(`${cursor_id}:${cursor_value}`);
}