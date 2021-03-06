import React, { useState,useEffect } from 'react'
import { Button,Modal,Form,Icon} from 'semantic-ui-react'
import axios from "axios"

function DeleteCustomer(props) {

    const {open, closeModal,customer} = props;
    const [id, setId] = useState(customer.customerId);

    function deleteCustomer(){
      axios.delete(`/Customers/DeleteCustomer/${id}`)
         .then((res)=>{
           console.log("success");
           props.fetchParentData();
        })
         .catch((error)=>console.log("Failed"));
         closeModal(false);       
    }

    useEffect(() => {
      setId(customer.customerId);
  
    },[customer.customerId])

    return (
      <Modal
      open={open}
    >
      <Modal.Header>Delete customer</Modal.Header>
      <Modal.Content image>
      <Form>
    <Form.Field>
      <label>Are you sure?</label>
    </Form.Field>
  </Form>
      </Modal.Content>
      <Modal.Actions>
      <Button onClick={() => closeModal(false)} color='black'>cancel</Button>
      <Button onClick={ deleteCustomer } type='submit' color='red' icon="window close">delete<Icon id="btnicon" name='window close'/></Button>    
      </Modal.Actions>
    </Modal>
    )
}

export default DeleteCustomer