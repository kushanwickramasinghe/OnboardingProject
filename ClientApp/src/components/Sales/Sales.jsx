import React, { useState,useEffect} from 'react'
import axios from "axios"
import { Icon, Table, Button } from 'semantic-ui-react'
import CreateSales from "./CreateSales";
import EditSales from "./EditSales";
import DeleteSales from "./DeleteSales";
import DropdownManu from "../Dropdown";
import Pagination from "../Pagination";

const Sales = () =>{ 

  const [open, setOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  //setting edit customer form prop
  const[customer, SetCustomer] = useState("");
  const[product, SetProduct] = useState("");
  const[store, SetStore] = useState("");
  const[datesold, SetDateSold] = useState("");

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
   console.log(datesold);
   setitem(item);
   SetCustomer(item.customer.name);
   SetProduct(item.product.name);
   SetStore(item.store.name);
   SetDateSold(item.dateSold);
   setEditOpen(true);
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
  
  axios.get('/Sales/GetSales')
  .then((res)=>{
    setItems(res.data);
  })  
  .catch((error)=>console.log(error));
}

 useEffect(() => {
  fechData();
},[])

function sortByCustomer() {

  const sortedItems = items.sort((a, b) => {
    const firstName = a.customer.name.toUpperCase() // ignore upper and lowercase
    const secondName = b.customer.name.toUpperCase() // ignore upper and lowercase

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

function sortByProduct() {

  const sortedItems = items.sort((a, b) => {
    const firstName = a.product.name.toUpperCase() // ignore upper and lowercase
    const secondName = b.product.name.toUpperCase() // ignore upper and lowercase

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

function sortByStore() {

  const sortedItems = items.sort((a, b) => {
    const firstName = a.store.name.toUpperCase() // ignore upper and lowercase
    const secondName = b.store.name.toUpperCase() // ignore upper and lowercase

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

function sortByDate() {

  const sortedItems = items.sort((a, b) => {
    const firstName = a.dateSold // ignore upper and lowercase
    const secondName = b.dateSold // ignore upper and lowercase

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

function setDateFormat(date){
  var dt=new Date(date);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  var formattedDate = dt.getDate() + "-" + months[dt.getMonth()] + "-" + dt.getFullYear()

  console.log(formattedDate);
  
  return formattedDate;
}
   return (

     <div>
       <CreateSales open={open} closeModal={setOpen} fetchParentData={fechData}/>
       <EditSales
        open={editOpen} 
        closeModal={setEditOpen} 
        fetchParentData={fechData} 
        sales={item} 
        customer={customer} product={product} store={store} datesold={datesold}
        />
       <DeleteSales open={DeleteOpen} closeModal={setDeleteOpen} fetchParentData={fechData} sales={item}/>
       
       <Button onClick={() => setOpen(true)} color='blue'>New Sale</Button>
<Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell onClick={sortByCustomer}>Customer<Icon name='sort'/></Table.HeaderCell>
        <Table.HeaderCell onClick={sortByProduct}>Product<Icon name='sort'/></Table.HeaderCell>
        <Table.HeaderCell onClick={sortByStore}>Store<Icon name='sort'/></Table.HeaderCell>
        <Table.HeaderCell onClick={sortByDate}>Date Sold<Icon name='sort'/></Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {(items.slice(indexOfFirstItem , indexOfLastItem)).map((itm)=>{
    return(
    <Table.Row key={itm.salesId}>
      <Table.Cell> {itm.customer.name} </Table.Cell>
      <Table.Cell> {itm.product.name} </Table.Cell>
      <Table.Cell> {itm.store.name} </Table.Cell>
      <Table.Cell> 
      {/* {(itm.dateSold).slice(0,10)}  */}
      {setDateFormat(itm.dateSold)}
        </Table.Cell>
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


export default Sales