import React, { useState,useEffect} from 'react'
import { Button, Form, Icon, Modal } from 'semantic-ui-react'
import axios from "axios"
//import DatePicker from "react-datepicker";
import { Dropdown } from 'semantic-ui-react'

function CreateSales(props) {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState("");
  const [stores, setStores] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [storeId, setStoreId] = useState("");
  const [dateSold, setDateSold] = useState(new Date());

  const {open, closeModal} = props;

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
  fechData();
},[])

function handleCustomerDropdown(event, {value}){
  setCustomerId(value)
}

function handleProductDropdown(event, {value}){
  setProductId(value)
}

function handleStoreSoldDropdown(event, {value}){
  setStoreId(value)
}

function createSales(customerId,productId,storeId,dateSold){
if(!customerId || !productId ||!storeId||!dateSold)
  {
    console.log("Should have value!!!")
  }
  else {
    let sales={
      CustomerId:customerId,
      ProductId:productId,
      StoreId:storeId,
      DateSold:dateSold
    }
    axios.post('/Sales/PostSales', sales)
  
    .then((res)=>{
      props.fetchParentData();
    })
    .catch((error)=>console.log(error));
    CloseModel();
    
  }
}

function CloseModel(){
  setCustomerId("");
  setProductId("");
  setStoreId("");
  setDateSold(new Date());
  closeModal(false);
}

  return (
    <Modal
      open={open}
    >
      <Modal.Header>Create sales</Modal.Header>
      <Modal.Content image>
      <Form>
      <Form.Field>
    <label>Date sold</label>
    {/* <Calendar placeholder={dateSold} onChange={date => setDateSold(date)} /> */}
    <input type="date" onChange={e => setDateSold(e.target.value)} />
    </Form.Field>

    <Form.Field>
    <label>Customer</label>
    <Dropdown 
    placeholder='customers' 
    selection
    search
    options={customers}
    onChange={handleCustomerDropdown}
    />
    </Form.Field>
    
    <Form.Field>
    <label>Product</label>
    <Dropdown 
    placeholder='Products' 
    selection
    search
    options={products}
    onChange={handleProductDropdown}
    />
    </Form.Field>

    <Form.Field>
    <label>Store</label>
    <Dropdown 
    placeholder='Stores' 
    selection
    search
    options={stores}
    onChange={handleStoreSoldDropdown}
    />
    </Form.Field>

  </Form>
      </Modal.Content>
      <Modal.Actions>
      <Button onClick={CloseModel} color='black'>cancel</Button>
      <Button onClick={()=>createSales(customerId,productId,storeId,dateSold) } type='submit' color='green'>create<Icon id="btnicon" name='check'/></Button>
      
      </Modal.Actions>
    </Modal>
  )
}

export default CreateSales