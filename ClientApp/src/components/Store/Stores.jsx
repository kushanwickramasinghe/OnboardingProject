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
  const [itemperpage, setItemperpage]=useState(5);
  const indexOfLastItem = currentPage * itemperpage;
  const indexOfFirstItem = indexOfLastItem - itemperpage;

  const [order, setOrder]=useState(0);


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

function sortByName() {

  const sortedItems = items.sort((a, b) => {
    const firstName = a.name.toUpperCase() // ignore upper and lowercase
    const secondName = b.name.toUpperCase() // ignore upper and lowercase

    if (firstName < secondName)
      return -1
    if (firstName > secondName)
      return 1
    else return 0
  })
  if (order === 0) {
    setOrder(1);
    setItems(sortedItems);
  }
  else {
    setOrder(0);
    setItems(sortedItems.reverse());
  }
}

function sortByAddress() {

  const sortedItems = items.sort((a, b) => {
    const firstAddress = a.address.toUpperCase() // ignore upper and lowercase
    const secondAddress = b.address.toUpperCase() // ignore upper and lowercase

    if (firstAddress < secondAddress)
      return -1
    if (firstAddress > secondAddress)
      return 1
    else return 0
  })
  if (order === 0) {
    setOrder(1);
    setItems(sortedItems);
  }
  else {
    setOrder(0);
    setItems(sortedItems.reverse());
  }
}

   return (

     <div>
       <CreateStore open={open} closeModal={setOpen} fetchParentData={fechData}/>
       <EditStore open={editOpen} closeModal={setEditOpen} fetchParentData={fechData} store={item}/>
       <DeleteStore open={DeleteOpen} closeModal={setDeleteOpen} fetchParentData={fechData} store={item}/>
       
       <Button onClick={() => setOpen(true)} color='blue'>New Store</Button>
<Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell onClick={sortByName}>Name<Icon name='sort'/></Table.HeaderCell>
        <Table.HeaderCell onClick={sortByAddress}>Address<Icon name='sort'/></Table.HeaderCell>
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