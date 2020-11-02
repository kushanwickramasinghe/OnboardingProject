import React, { useState } from 'react'
import { Button, Form, Icon, Modal } from 'semantic-ui-react'
import axios from "axios"

function CreateStore(props) {
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");

  const {open, closeModal} = props;

function createStore(Name,Address){
if(!Name || !Address)
  {
    console.log("Should have value!!!")
  }
  else {
    let store={
      Name:Name,
      Address:Address
    }
    axios.post('/Stores/PostStore', store)
  
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
      <Modal.Header>Create Store</Modal.Header>
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
      <Button onClick={()=>createStore(Name,Address) } type='submit' color='green'><Icon name='check'/>Create</Button>
      <Button onClick={CloseModel} color='black'>Cancel</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default CreateStore