import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import Item from './Item'; 
import Attachment from "../../../Attachment/Attachment"
import FullScreenSlider from "../../../MediaSlider/Slider"

export default ({ attachments }) => {
  
  const dispatch = useDispatch();
  const [initial_fullscreen_index, setInitialFullScreenIndex] = useState(null)

  return (
   
    <div>
      
      { attachments.length > 1 ? (
       
        <div className='grid-container'>
          
          { attachments.map((item, index) => (

              <Item {...item}
               
                onClick={()=>setInitialFullScreenIndex(index)}
                should_expand={(attachments.length % 2 != 0 && index == attachments.length-1)}
              />
          )

        )}
      
        </div>
     
      ) : (
        
        <Attachment
          
          id={attachments[0].id}
          format={attachments[0].format}
          is_processing={attachments[0].is_processing}
          is_fullscreen={false}
          onClick={()=>setInitialFullScreenIndex(0)}

        />
      
      )}

      <FullScreenSlider 

        is_open={initial_fullscreen_index!=null} 
        attachments={attachments} 
        initial_index={initial_fullscreen_index}
        closeSider={()=>setInitialFullScreenIndex(null)}

      />  
    
    </div>
  );
};
