import React, { useState,useEffect } from 'react'
import { Button, Form, Icon, Modal } from 'semantic-ui-react'
import axios from "axios"

function EditStore(props) {

    const {open, closeModal,store} = props;
    const [name, setName] = useState(store.name);
    const [address, setAddress] = useState(store.address);
    const [id, setId] = useState(store.storeId);

    function editStore(Name,Address){

      if(!Name || !Address)
        {
          console.log("Should have value!!!")
        }
        else {
          let store={
            StoreId:id,
            Name:name,
            Address:address
          }
          axios.put(`/Stores/PutStore/${id}`, store)

          .then((res)=>{
            props.fetchParentData();
          })
          .catch((error)=>console.log("Failed"));
          closeModal(false);
          
        }
      }

  useEffect(() => {
    setName(store.name);
    setAddress(store.address);
    setId(store.storeId);

  },[store.name,store.address,store.storeId])
    
  return (

    <Modal
      open={open}
    >
      <Modal.Header>Edit store</Modal.Header>
      <Modal.Content image>
      <Form>
    <Form.Field>
      <label>NAME</label>
      <input  Value={props.store.name} onChange={e => setName(e.target.value)}></input>
    </Form.Field>
    <Form.Field>
      <label>ADDRESS</label>
      <input Value={props.store.address} onChange={e => setAddress(e.target.value)}/>
    </Form.Field>
  </Form>
      </Modal.Content>
      <Modal.Actions>
      <Button onClick={() => closeModal(false)} color='black'>cancel</Button>
      <Button onClick={()=>editStore(name,address)} type='submit'color='green'>edit<Icon id="btnicon" name='check'/></Button>    
      </Modal.Actions>
    </Modal>
  )
}

export default EditStore