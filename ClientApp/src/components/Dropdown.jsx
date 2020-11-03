import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'

function DropdownManu(props) {

    const pages=[
        {key:1, value:"5", text: "5"},
        { key: 2, value: "10", text: "10" },
        { key: 2, value: "15", text: "15" },
        { key: 2, value: "20", text: "20" },
        { key: 2, value: "25", text: "25" }
      ];

    function handleDropdown(event, {value}){
        //console.log("handleDropdown!!!!");
        props.setNoOfItem(value);
        //console.log(value);
    }
    
return(
    <Dropdown 
    placeholder='5' 
    selection
    search
    options={pages}
    onChange={handleDropdown}
    />
)
}

export default DropdownManu