import React, { useState,useEffect} from 'react'
import axios from "axios"
import { Icon, Table, Button } from 'semantic-ui-react'
import CreateStore from "./CreateStore";
import EditStore from "./EditStore";
import DeleteStore from "./DeleteStore";
import DropdownManu from "../Dropdown";
import Pagination from "../Pagination";

const Stores = () =>{ 

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [DeleteOpen, setDeleteOpen] = useState(false);
  const [items, setItems]=useState([]);
  const [item, setitem]=useState({});

  const [currentPage, setcurrentPage]=useState(1);
  const [itemperpage, setItemperpage]=useState(2);
  const indexOfLastItem = currentPage * itemperpage;
  const indexOfFirstItem = indexOfLastItem - itemperpage;


 //Edit model
 function setEditForm(item)
 {
   setEditOpen(true);
   setitem(item);
 }

 //delete model
 function setDeleteForm(item)
 {
  setDeleteOpen(true);
  setitem(item);
 }

 //set current page
function paginate(pagenumber) {
    setcurrentPage(pagenumber);
  }
  
  //set no of items per page
  function setNoOfItem(number) {
    setItemperpage(number);
  }

//fetch data from database
function fechData(){
  
  axios.get('/Stores/GetStore')
  .then((res)=>{
    setItems(res.data);
  })
  .catch((error)=>console.log(error));
}

 useEffect(() => {
  fechData();
},[])

   return (

     <div>
       <CreateStore open={open} closeModal={setOpen} fetchParentData={fechData}/>
       <EditStore open={editOpen} closeModal={setEditOpen} fetchParentData={fechData} store={item}/>
       <DeleteStore open={DeleteOpen} closeModal={setDeleteOpen} fetchParentData={fechData} store={item}/>
       
       <Button onClick={() => setOpen(true)} color='blue'>New Store</Button>
<Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Address</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {(items.slice(indexOfFirstItem , indexOfLastItem)).map((itm)=>{
    return(
    <Table.Row key={itm.storeId}>
      <Table.Cell> {itm.name} </Table.Cell>
      <Table.Cell> {itm.address} </Table.Cell>
      <Table.Cell><Button onClick={() => setEditForm(itm)} color='yellow' ><Icon name='edit'/>Edit</Button></Table.Cell>
      <Table.Cell><Button onClick={() => setDeleteForm(itm)} color='red'><Icon name='trash'/>Delete</Button></Table.Cell>
    </Table.Row>
  )
  })}
    </Table.Body>
    </Table>
    <span>
    <DropdownManu setNoOfItem={setNoOfItem}/>
    <Pagination itemperpage={itemperpage} totalitem={items.length} paginate={paginate}/>
    </span>
     </div>
)}


export default Stores