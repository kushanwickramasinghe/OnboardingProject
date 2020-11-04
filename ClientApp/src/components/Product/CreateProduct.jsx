import React, { useState } from 'react'
import { Button, Form, Icon, Modal } from 'semantic-ui-react'
import axios from "axios"

function CreateProduct(props) {
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState("");

  const {open, closeModal} = props;

function createProduct(Name,Price){
if(!Name || !Price)
  {
    console.log("Should have value!!!")
  }
  else {
    let product={
      Name:Name,
      Price:parseInt(Price)
    }
    axios.post('/Products/PostProduct', product)
  
    .then((res)=>{
      console.log(res.data);
      props.fetchParentData();
    })
    .catch((error)=>console.log(error));
    CloseModel();
    
  }
}

//close model
function CloseModel(){
  setName("");
  setPrice("");
  closeModal(false);
}

function onChange(e){
  const re = /^[0-9\b]+$/;
  if (e.target.value === '' || re.test(e.target.value)) {
    setPrice(e.target.value);
  }
  else{
    alert("Numbers only");
    setPrice(0);
  }
}


  return (
    <Modal
      open={open}
    >
      <Modal.Header>Create product</Modal.Header>
      <Modal.Content image>
      <Form>
    <Form.Field>
      <label>NAME</label>
      <input onChange={e => setName(e.target.value)} />
    </Form.Field>
    <Form.Field>
      <label>PRICE</label>
      <input onChange={e => onChange(e)}/> 

    </Form.Field>
  </Form>
      </Modal.Content>
      <Modal.Actions>
      <Button onClick={CloseModel} color='black'>cancel</Button>
      <Button onClick={()=>createProduct(Name,Price) } type='submit' color='green'>create<Icon id="btnicon" name='check'/></Button>
      
      </Modal.Actions>
    </Modal>
  )
}

export default CreateProduct