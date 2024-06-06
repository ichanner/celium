//@ts-nocheck
import {Agenda, Job} from "agenda"
import fs from 'fs'
import path from 'path'
import config from "../config/index"

export default (job : Job) =>{

	const {attachments} = job.attrs.data

	try{

		attachments.forEach(({ id, format }) => {
		  const format_split = format.split('/');

		  if (format_split[0] === 'video') {
		    //remove videos and their previews
		    fs.readdir(config.UPLOAD_DESTINATION, (err, files) => {
		      if (err) throw err;

		      files.forEach((file) => {
		        const video_path = path.join(config.UPLOAD_DESTINATION, file);
		        const thumbnail_path = path.join(config.TEMP_DESTINATION, `${id}.jpg`);

		        if (file.includes(id)) {
		          fs.unlink(video_path, (unlinkErr) => {
		            if (unlinkErr) throw unlinkErr;
		          });
		          fs.unlink(thumbnail_path, (unlinkErr) => {
		            if (unlinkErr) throw unlinkErr;
		          });
		        }
		      });
		    });
		  } else {
		    const image_path = path.join(config.UPLOAD_DESTINATION, `${id}.${format_split[1]}`);
		    const preview_path = path.join(config.PREVIEW_DESTINATION, `${id}.jpg`);

		    fs.unlink(image_path, (unlinkErr) => {
		      if (unlinkErr) throw unlinkErr;
		    });

		    if (attachments.length > 1) {
		      fs.unlink(preview_path, (unlinkErr) => {
		        if (unlinkErr) throw unlinkErr;
		      });
		    }
		  }
		});
	}
	catch(err){

		throw new Error(err)
	}
}