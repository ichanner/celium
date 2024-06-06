const isReverse = (at_pointer, at_next) => {
    if (at_next == undefined)
        return;
    return (at_pointer.index[1] < at_next.index[1]);
};
export default (at_pointer, at_next, pointer_coords, coords, length) => {
    /*
    let new_coords

    if(is_branch){ //branch off

        new_coords = [at_pointer.coords, pointer_coords]
    }
    else{

        let inserted_coords
                
        if(is_disjoint){

            const can_predate = at_pointer.index[1] == 0 && length > 1
            inserted_coords = can_predate ? [pointer_coords, ...coords] : [...coords, pointer_coords]
        }
        else{

           if(close_shape){

                const spread = is_closed ? coords.slice(0, length) : coords
                inserted_coords = [...spread, pointer_coords, coords[0]]
            }
            else{

                const in_between = isReverse(at_pointer, at_next) ? at_next : at_pointer
                const coords_index = coords.findIndex((point)=>{
                    
                    return arraysEqual(point, in_between.coords)
                })

                inserted_coords = [

                    ...coords.slice(0, coords_index), pointer_coords,
                    ...coords.slice(coords_index)
                ]
            }
        }
    }

    return inserted_coords
    */
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0TGluZVBvaW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9nZXRMaW5lUG9pbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE1BQU0sU0FBUyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBQyxFQUFFO0lBRXhDLElBQUcsT0FBTyxJQUFJLFNBQVM7UUFBRSxPQUFNO0lBRS9CLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNoRCxDQUFDLENBQUE7QUFFRCxlQUFlLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxFQUFFO0lBQ3BFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQXlDQztBQUNILENBQUMsQ0FBQSJ9