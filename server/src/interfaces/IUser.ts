
export default interface IUser{

	id: string,
	username: string,
	creation_date: number,
	liked_posts: [string] | [],
	following: [string] | [],
}