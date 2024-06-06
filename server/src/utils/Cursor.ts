//@ts-nocheck
import {DIRECTIONS} from "./enums"
import {ObjectId} from 'mongodb'

const {TOP, DOWN, AROUND} = DIRECTIONS

class Cursor{

	public static decode(cursor: string) {
       
        const decoded = Buffer.from(cursor, 'base64').toString('utf-8');
        const parts = decoded.split("|");
       
        return parts.map(part => {
            let [field, value] = part.split(":");
            return { field, value };
        });
    }

	public static getCompoundCursor(cursor: string | null, cursor_fields: [{ field: string, order: number }]) {
	   
	    if (!cursor) return [];

	    const decoded = this.decode(cursor);
	    
	    const conditions = cursor_fields.map((cursor_field) => {
	      
	        const { field, order } = cursor_field;
	        const cursor_value = decoded.find(dec => dec.field === field).value;
	        const operator = order === 1 ? '$gt' : '$lt';
	        
	        return {
	            
	            [field]: { [operator]: cursor_value }
	        };
	    });

	    // Add a tie-breaking condition using the unique identifier
	    const cursor_id = new ObjectId(decoded.find(dec => dec.field === '_id').value);
	   
	    conditions.push({ _id: { '$gt': cursor_id }});

	    return [
	        { $match: { $and: conditions } }
	    ];
	}

	public static paginatePosts(max_results : number, results_field : string){

		return [

			{
				$facet:{

					metadata: [

						{ $count: 'total' }
					],

					[results_field]:[

						{ $limit: max_results }
					]
				}
			},

			{
				$project:{

					[results_field]: 1,

					has_next:{

						 $gt: [ { $arrayElemAt: ["$metadata.total", 0] }, max_results ] 
					}	
				}
			}
		]

	}


	public static getNextBatch(cursor : string | null, max_results : number, results_field : string, cursor_fields: [{ field: string, order: number }]){

		const filter = this.getCompoundCursor(cursor, cursor_fields);

		return [

			...filter,

			...this.paginatePosts(max_results, results_field)
			
		]
	}
}

export default Cursor
