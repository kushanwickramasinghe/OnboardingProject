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
      <Modal.Header>Create Customer</Modal.Header>
      <Modal.Content image>
      <Form>
    <Form.Field>
      <label>Name</label>
      <input onChange={e => setName(e.target.value)} />
    </Form.Field>
    <Form.Field>
      <label>Address</label>
      <input onChange={e => setAddress(e.target.value)}/> 

    </Form.Field>
  </Form>
      </Modal.Content>
      <Modal.Actions>
      <Button onClick={()=>createCustomer(Name,Address) } type='submit' color='green'><Icon name='check'/>Create</Button>
      <Button onClick={CloseModel} color='black'>Cancel</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default CreateCustomer