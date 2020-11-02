import React, { useState,useEffect } from 'react'
import { Button, Form, Icon, Modal } from 'semantic-ui-react'
import axios from "axios"
import { Dropdown } from 'semantic-ui-react'

function EditSales(props) {

    const {open, closeModal,sales} = props;

    const [id, setId] = useState(sales.salesId);
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState("");
    const [stores, setStores] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [productId, setProductId] = useState("");
    const [storeId, setStoreId] = useState("");
    const [dateSold, setDateSold] = useState(0);

    //fetch data from database for dropdowns
function fechData(){
  
  axios.all([
    axios.get('/Customers/GetCustomer'),
    axios.get('/Products/GetProduct'),
    axios.get('/Stores/GetStore')
  ])
  .then(axios.spread((Customers, Products,Stores) => {
    setCustomers((Customers.data).map((c) => ({key: c.customerId, value: c.customerId, text: c.name})));
    setProducts((Products.data).map((p) => ({key: p.productId, value: p.productId, text: p.name})));
    setStores((Stores.data).map((s) => ({key: s.storeId, value: s.storeId, text: s.name})));
  }));
}

    useEffect(() => {
        setId(sales.salesId);
        setCustomerId(sales.customerId);
        setProductId(sales.productId);
        setStoreId(sales.storeId);
        setDateSold(sales.dateSold);
        fechData();
      },[sales.salesId,sales.customerId,sales.productId,sales.storeId,sales.dateSold])
      

      function handleCustomerDropdown(event, {value}){      
        setCustomerId(value)
      }
      
      function handleProductDropdown(event, {value}){
        setProductId(value)
      }
      
      function handleStoreSoldDropdown(event, {value}){
        setStoreId(value)
      }
      
      function editSales(customerId,productId,storeId,dateSold){
      if(!customerId || !productId ||!storeId||!dateSold)
        {
          console.log("Should have value!!!")
        }
        else {
          let sales={
            SalesId:id,
            CustomerId:customerId,
            ProductId:productId,
            StoreId:storeId,
            DateSold:dateSold
          }
          axios.put(`/Sales/PutSales/${id}`, sales)
        
          .then((res)=>{
            props.fetchParentData();
          })
          .catch((error)=>console.log(error));
          closeModal(false);
          
        }
      }
      
    
  return (

    <Modal
      open={open}
    >
      <Modal.Header>Edit Sales</Modal.Header>
      <Modal.Content image>
      <Form>
      <Form.Field>
    <label>Date Sold</label>
    {/* <DatePicker selected={Date.parse(dateSold)} onChange={(date)=>handleDatePicker(date)} /> */}
    <input type="date" value={dateSold} onChange={e => setDateSold(e.target.value)} />
    </Form.Field>

    <Form.Field>
    <label>Customer</label>
    <Dropdown 
    placeholder={props.customer}
    selection
    search
    options={customers}
    onChange={handleCustomerDropdown}
    />
    </Form.Field>
    
    <Form.Field>
    <label>products</label>
    <Dropdown 
    placeholder={props.product} 
    selection
    search
    options={products}
    onChange={handleProductDropdown}
    />
    </Form.Field>

    <Form.Field>
    <label>Stores</label>
    <Dropdown 
    placeholder={props.store} 
    selection
    search
    options={stores}
    onChange={handleStoreSoldDropdown}
    />
    </Form.Field>

  </Form>
      </Modal.Content>
      <Modal.Actions>
      <Button onClick={()=>editSales(customerId,productId,storeId,dateSold) } type='submit' color='green'><Icon name='check'/>Edit</Button>
      <Button onClick={()=>closeModal(false)} color='black'>Cancel</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default EditSales