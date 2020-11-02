import React, { useState,useEffect } from 'react'
import { Button,Modal,Form,Icon} from 'semantic-ui-react'
import axios from "axios"

function DeleteSales(props) {

    const {open, closeModal,sales} = props;
    const [id, setId] = useState(sales.salesId);

    function deleteSales(){
      axios.delete(`/Sales/DeleteSales/${id}`)
         .then((res)=>{
           console.log("success");
           props.fetchParentData();
        })
         .catch((error)=>console.log("Failed"));
         closeModal(false);       
    }

    useEffect(() => {
        setId(sales.salesId);
      },[sales.salesId])

    return (
      <Modal
      open={open}
    >
      <Modal.Header>Delete Sales</Modal.Header>
      <Modal.Content image>
      <Form>
    <Form.Field>
      <label>Are you sure?</label>
    </Form.Field>
  </Form>
      </Modal.Content>
      <Modal.Actions>
      <Button onClick={ deleteSales } type='submit' color='red' icon="window close"><Icon name='window close'/>delete</Button>
      <Button onClick={() => closeModal(false)} color='black'>Cancel</Button>
      </Modal.Actions>
    </Modal>
    )
}

export default DeleteSales