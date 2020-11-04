import React, { useState } from 'react'
import { Button, Form, Icon, Modal } from 'semantic-ui-react'
import axios from "axios"

function CreateCustomer(props) {
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");

  const {open, closeModal} = props;

function createCustomer(Name,Address){
if(!Name || !Address)
  {
    console.log("Should have value!!!")
  }
  else {
    let customer={
      Name:Name,
      Address:Address
    }
    console.log('customer name='+customer);
    axios.post('/Customers/PostCustomer', customer)
  
    .then((res)=>{
      props.fetchParentData();
    })
    .catch((error)=>console.log(error));
    CloseModel();
    
  }
}

//close model
function CloseModel(){
  setName("");
  setAddress("");
  closeModal(false);
}

  return (
    <Modal
      open={open}
    >
      <Modal.Header>Create customer</Modal.Header>
      <Modal.Content image>
      <Form>
    <Form.Field>
      <label>NAME</label>
      <input onChange={e => setName(e.target.value)} />
    </Form.Field>
    <Form.Field>
      <label>ADDRESS</label>
      <input onChange={e => setAddress(e.target.value)}/> 

    </Form.Field>
  </Form>
      </Modal.Content>
      <Modal.Actions>
      <Button onClick={CloseModel} color='black'>cancel</Button>
      <Button onClick={()=>createCustomer(Name,Address) } type='submit' color='green'>create<Icon id="btnicon" name='check'/></Button>     
      </Modal.Actions>
    </Modal>
  )
}

export default CreateCustomer