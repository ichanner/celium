//@ts-nocheck
import ffmpeg from 'fluent-ffmpeg'
import path from 'path'
import sharp from 'sharp'
import {Agenda, Job} from "agenda"
import {Container} from 'typedi'
import config from "../config/index"
import IAttachment from "../interfaces_v2/IAttachment"
import Attachment from '../utils/Attachment'
import PostService from "../services/posts"
import TrailService from "../services/trail"

export default async(job : Job)=>{

	const target_resolutions = [
	  
	  { width: 1920, height: 1080 }, // 16:9
	  { width: 1280, height: 720 }, // 16:9,
	  { width: 1080, height: 1920 }, // 9:16 portrait
	  { width: 1080, height: 1080 }, // 1:1
	]
	const streaming_qualities = [

		{name: 'high', bitrate: 5000, resolution_factor: 1, crf: 20},
		{name: 'medium', bitrate: 2500, resolution_factor: 2, crf: 23},
		{name: 'low', bitrate: 2500, resolution_factor: 4, crf: 26},
	]
	const {created_post} = job.attrs.data
	const {attachments, post_id, user_id} = created_post
	const postService = Container.get(PostService)
	const target_width = 800
	const num_attachments = attachments.length
	const paths = attachments.map((attachment, i) => {
	   		
   		const {format, id} = attachment
   		const format_split = format.split('/')

    	return {

    		type: format_split,
    		index: i,
    		id: id,
    		file_path: path.join(config.TEMP_DESTINATION, `${id}.${format_split[1]}`),
    	}
	})

	const getOrientation = (width : number, height : number) =>{

		return (width > height) ? 'landscape' : 'portrait'
	}

	const encodeImage = async(input_path : string, is_preview : boolean, id : string) =>{

		const output_folder = is_preview ? config.PREVIEW_DESTINATION : config.UPLOAD_DESTINATION
		const output_path = path.join(output_folder, `${id}.jpg`)
		const quality_factor = is_preview ? 2 : 1
		const quality = 80/quality_factor

		return new Promise((resolve, reject)=>{
			sharp(input_path)
			.resize(target_width, null, {fit: 'inside'})
			.rotate()
			.jpeg({quality: quality})
			.toFile(output_path, (err)=>{

				if(err) reject(err) 

				resolve()
			})
		})
	}

	const encodeVideo = (quality : string, input_path : string, id : string, width : number, height : number, crf : number, bitrate : number, fps : number, ext : string) =>{

		const output_path = path.join(config.UPLOAD_DESTINATION, `${id}_${quality}.${ext}`)

		return new Promise((resolve, reject)=>{

			ffmpeg(input_path)
			  .output(output_path)
			  .videoCodec('libx264')
			  .addOption('-vf', `scale=${width}:${height}`)
			  .audioCodec('aac')
			  .videoBitrate(`${bitrate}`)
			  .audioBitrate('128k')
			  .autopad()
			  .outputOptions(`-r ${fps}`)
			  .outputOptions(`-crf ${crf}`)
			  .on('progress', (progress) => {console.log(`Encoding progress: ${progress.percent}%`)})
			  .on('error', (err)=>reject(err))
			  .on('end', ()=>resolve())
			  .run();
		})
	}
	
	const processPaths = async () => {
	  const promises = paths.map(({ file_path, id, type }) => {
	    if (type[0] === 'video') {
	      return new Promise((resolve, reject) => {
	        ffmpeg.ffprobe(file_path, async (err, metadata) => {
	          if (err) reject(err);

	          const width = metadata.streams[0].width;
	          const height = metadata.streams[0].height;
	          const fps = metadata.streams[0].r_frame_rate;
	          const current_orientation = getOrientation(width, height);

	          let target_resolution = { width, height };

	          target_resolutions.forEach((resolution) => {
	            if (
	              current_orientation === getOrientation(resolution.width, resolution.height) &&
	              Math.abs(width / height - resolution.width / resolution.height) <
	                Math.abs(width / height - target_resolution.width / target_resolution.height)
	            ) {
	              target_resolution = resolution;
	            }
	          });

	          const encodePromises = streaming_qualities.map((quality) => {
	            const { name, resolution_factor, bitrate, crf } = quality;
	            return encodeVideo(
	              name,
	              file_path,
	              id,
	              target_resolution.width / resolution_factor,
	              target_resolution.height / resolution_factor,
	              crf,
	              bitrate,
	              fps,
	              type[1]
	            );
	          });

	          try {
	            await Promise.all(encodePromises);

	            if (quality === 'high') {
	              const preview_path = path.join(config.TEMP_DESTINATION, `${id}.jpg`);
	              await new Promise((resolve, reject) => {
	                ffmpeg(file_path)
	                  .screenshots({
	                    count: 1,
	                    timemarks: ['00:00:01'],
	                    folder: config.TEMP_DESTINATION,
	                    filename: `${id}.jpg`,
	                  })
	                  .on('error', (err) => reject(err))
	                  .on('end', () => {
	                    encodeImage(preview_path, true, id)
	                      .then(() => {
	                        resolve();
	                      })
	                      .catch(reject);
	                  });
	              });
	            }

	            resolve();
	          } catch (err) {
	            reject(err);
	          }
	          finally{

	          	postService.setPostProcessed(post_id, Attachment(id, `video/${type[1]}`, true), user_id);
	          }
	        });
	      });
	    } else {
	      const imagePromises = [
	        encodeImage(file_path, true, id),
	        encodeImage(file_path, false, id),
	      ];
	      Promise.all(imagePromises).then(() => {
        	postService.setPostProcessed(post_id, Attachment(id, `image/jpg`, true), user_id);
     	  });
	    }
	  });

	  try {
	    
	    await Promise.all(promises);
	    
	    if(created_post.trail_id){

	    	await postService.emitNewPost(created_post)
	    }

	  } 
	  catch (err) {
	    
	    console.error('Error processing paths:', err);
	  }
	}

	processPaths()
}

