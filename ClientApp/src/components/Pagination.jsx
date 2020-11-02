import React, { useState } from 'react'


const Pagination = ({itemperpage,totalitem,paginate}) =>{ 
    const pageNumbers=[];

    for (let i = 1; i <= Math.ceil(totalitem / itemperpage); i++) {
        pageNumbers.push(i);
    }

return(

   <div id="pagination" aria-label="Pagination Navigation" role="navigation" className="ui pagination menu">
                {pageNumbers.map(number=>(

                    <a key={number}
                    aria-current="true" 
                    aria-disabled="false" 
                    tabIndex="0" value="1" 
                    type="pageItem" 
                    className="active item"
                    onClick={()=>paginate(number)}
                    >
                    {number}    
                    </a>

                    )
                )}


    </div>

)
}

export default Pagination