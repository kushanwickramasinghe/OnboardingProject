import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'

function DropdownManu(props) {

    const pages=[
        {key:1, value:"2", text: "2"},
        {key:2, value:"3", text: "3"}
      ];

    function handleDropdown(event, {value}){
        //console.log("handleDropdown!!!!");
        props.setNoOfItem(value);
        //console.log(value);
    }
    
return(
    <Dropdown 
    placeholder='2' 
    selection
    search
    options={pages}
    onChange={handleDropdown}
    />
)
}

export default DropdownManu