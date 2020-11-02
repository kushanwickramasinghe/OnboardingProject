import React, { useState,useEffect } from 'react'
import { Button,Modal,Form,Icon} from 'semantic-ui-react'
import axios from "axios"

function DeleteStore(props) {

    const {open, closeModal,store} = props;
    const [id, setId] = useState(store.storeId);

    function deleteStore(){
      axios.delete(`/Stores/DeleteStore/${id}`)
         .then((res)=>{
           props.fetchParentData();
        })
         .catch((error)=>console.log("Failed"));
         closeModal(false);       
    }

    useEffect(() => {
      setId(store.storeId);
  
    },[store.storeId])

    return (
      <Modal
      open={open}
    >
      <Modal.Header>Delete Store</Modal.Header>
      <Modal.Content image>
      <Form>
    <Form.Field>
      <label>Are you sure?</label>
    </Form.Field>
  </Form>
      </Modal.Content>
      <Modal.Actions>
      <Button onClick={ deleteStore } type='submit' color='red' icon="window close"><Icon name='window close'/>delete</Button>
      <Button onClick={() => closeModal(false)} color='black'>Cancel</Button>
      </Modal.Actions>
    </Modal>
    )
}

export default DeleteStore