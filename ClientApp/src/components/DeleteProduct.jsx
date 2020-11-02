import React, { useState,useEffect } from 'react'
import { Button,Modal,Form,Icon} from 'semantic-ui-react'
import axios from "axios"

function DeleteProduct(props) {

    const {open, closeModal,product} = props;
    const [id, setId] = useState(product.productId);

    function deleteProduct(){
      axios.delete(`/Products/DeleteProduct/${id}`)
         .then((res)=>{
           console.log("success");
           props.fetchParentData();
        })
         .catch((error)=>console.log("Failed"));
         closeModal(false);       
    }

    useEffect(() => {
      setId(product.productId);
  
    },[product.productId])

    return (
      <Modal
      open={open}
    >
      <Modal.Header>Delete Product</Modal.Header>
      <Modal.Content image>
      <Form>
    <Form.Field>
      <label>Are you sure?</label>
    </Form.Field>
  </Form>
      </Modal.Content>
      <Modal.Actions>
      <Button onClick={ deleteProduct } type='submit' color='red' icon="window close"><Icon name='window close'/>delete</Button>
      <Button onClick={() => closeModal(false)} color='black'>Cancel</Button>
      </Modal.Actions>
    </Modal>
    )
}

export default DeleteProduct