import processAttachments_v2 from '../jobs/processAttachments_v2'
import deleteAttachments from "../jobs/deleteAttachments"
import Agenda from 'agenda'

export default async(agenda : Agenda) =>{

	agenda.define('processAttachments_v2', processAttachments_v2)
	agenda.define('deleteAttachments', deleteAttachments)

	await agenda.start()
}