import IAttachment from "./IAttachment"

export default interface IPost{

	post_id: string,
	parent_id: string,
	author_id: string,
	topic: string,
	color: string,
	attachments: [IAttachment] | [],
	body: string,
	creation_date: number, 
	bridges: number,
	replies: number,
	likes:number,
	edit_date: number | null,
	

	//is_op: boolean,
	//replier_post_id: string | null,
	//inheritor_thread_id: string,
	//is_bridge: boolean,
	//bridged_post_id: string | null,
}