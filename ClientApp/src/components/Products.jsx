import React, { useState,useEffect} from 'react'
import axios from "axios"
import { Icon, Table, Button } from 'semantic-ui-react'
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import DropdownManu from "../Dropdown";
import Pagination from "../Pagination";

const Products = () =>{ 

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
  
  axios.get('/Products/GetProduct')
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
       <CreateProduct open={open} closeModal={setOpen} fetchParentData={fechData}/>
       <EditProduct open={editOpen} closeModal={setEditOpen} fetchParentData={fechData} product={item}/>
       <DeleteProduct open={DeleteOpen} closeModal={setDeleteOpen} fetchParentData={fechData} product={item}/>
       
       <Button onClick={() => setOpen(true)} color='blue'>New Product</Button>
<Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Price</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {(items.slice(indexOfFirstItem , indexOfLastItem)).map((itm)=>{
    return(
    <Table.Row key={itm.productId}>
      <Table.Cell> {itm.name} </Table.Cell>
      <Table.Cell> ${itm.price} </Table.Cell>
      <Table.Cell><Button onClick={() => setEditForm(itm)} color='yellow'><Icon name='edit'/>Edit</Button></Table.Cell>
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


export default Products