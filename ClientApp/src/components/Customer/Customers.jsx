import React, { useState,useEffect} from 'react'
import axios from "axios"
import { Icon, Table, Button } from 'semantic-ui-react'
import CreateCustomer from "./CreateCustomer";
import EditCustomer from "./EditCustomer";
import DeleteCustomer from "./DeleteCustomer";
import DropdownManu from "../Dropdown";
import Pagination from "../Pagination";

const Customers = () =>{ 

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [DeleteOpen, setDeleteOpen] = useState(false);
  const [customers, setCustomers]=useState([]);
  const [customer, setCustomer]=useState({});

 const [currentPage, setcurrentPage]=useState(1);
 const [itemperpage, setItemperpage]=useState(5);
 const indexOfLastItem = currentPage * itemperpage;
 const indexOfFirstItem = indexOfLastItem - itemperpage;

 const [order, setOrder]=useState(0);
 
 //Edit model
 function setCustomerEditForm(customer)
 {
   setEditOpen(true);
   setCustomer(customer);
 }

 //delete model
 function setDeleteForm(customer)
 {
  setDeleteOpen(true);
  setCustomer(customer);
 }

//fetch data from database
function fechData(){
  
  axios.get('/Customers/GetCustomer')
  .then((res)=>{
   setCustomers(res.data);
  })
  .catch((error)=>console.log(error));
}

 useEffect(() => {
  fechData();
},[])

//set current page
function paginate(pagenumber) {
  setcurrentPage(pagenumber);
}

//set no of items per page
function setNoOfItem(number) {
  setItemperpage(number);
}

  function sortByName() {

    const sortedCustomers = customers.sort((a, b) => {
      const nameA = a.name.toUpperCase() // ignore upper and lowercase
      const nameB = b.name.toUpperCase() // ignore upper and lowercase

      if (nameA < nameB)
        return -1
      if (nameA > nameB)
        return 1
      else return 0
    })
    if (order === 0) {
      setOrder(1);
      setCustomers(sortedCustomers);
    }
    else {
      setOrder(0);
      setCustomers(sortedCustomers.reverse());
    }
  }

  function sortByAddress() {

    const sortedCustomers = customers.sort((a, b) => {
      const nameA = a.address.toUpperCase() // ignore upper and lowercase
      const nameB = b.address.toUpperCase() // ignore upper and lowercase

      if (nameA < nameB)
        return -1
      if (nameA > nameB)
        return 1
      else return 0
    })
    if (order === 0) {
      setOrder(1);
      setCustomers(sortedCustomers);
    }
    else {
      setOrder(0);
      setCustomers(sortedCustomers.reverse());
    }
  }


   return (

     <div>
       <CreateCustomer open={open} closeModal={setOpen} fetchParentData={fechData}/>
       <EditCustomer open={editOpen} closeModal={setEditOpen} fetchParentData={fechData} customer={customer}/>
       <DeleteCustomer open={DeleteOpen} closeModal={setDeleteOpen} fetchParentData={fechData} customer={customer}/>
       
       <Button onClick={() => setOpen(true)} color='blue'>New Customer</Button>
<Table class="ui striped table" celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell onClick={sortByName}>Name<Icon name='sort'/></Table.HeaderCell>
        <Table.HeaderCell onClick={sortByAddress}>Address<Icon name='sort'/></Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {(customers.slice(indexOfFirstItem , indexOfLastItem)).map((cust)=>{
    return(
    <Table.Row key={cust.customerId}>
      <Table.Cell> {cust.name} </Table.Cell>
      <Table.Cell> {cust.address} </Table.Cell>
      <Table.Cell><Button onClick={() => setCustomerEditForm(cust)} color='yellow'><Icon name='edit'/>Edit</Button></Table.Cell>
      <Table.Cell><Button onClick={() => setDeleteForm(cust)} color='red'><Icon name='trash'/>Delete</Button></Table.Cell>
    </Table.Row>
  )
  })}
    </Table.Body>
    </Table>
    <span>
    <DropdownManu setNoOfItem={setNoOfItem}/>
    <Pagination itemperpage={itemperpage} totalitem={customers.length} paginate={paginate}/>
    </span>
     </div>
)}


export default Customers