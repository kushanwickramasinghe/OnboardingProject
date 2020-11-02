import React, { useState,useEffect } from 'react'
import { Button, Form, Icon, Modal } from 'semantic-ui-react'
import axios from "axios"

function EditCustomer(props) {

    const {open, closeModal,customer} = props;
    const [name, setName] = useState(customer.name);
    const [address, setAddress] = useState(customer.address);
    const [id, setId] = useState(customer.customerId);

    function editCustomer(Name,Address){

      if(!Name || !Address)
        {
          console.log("Should have value!!!")
        }
        else {
          let customer={
            CustomerId:id,
            Name:name,
            Address:address
          }
          axios.put(`/Customers/PutCustomer/${id}`, customer)

          .then((res)=>{
            console.log("success");
            props.fetchParentData();
          })
          .catch((error)=>console.log("Failed"));
          closeModal(false);
          
        }
      }

  useEffect(() => {
    setName(customer.name);
    setAddress(customer.address);
    setId(customer.customerId);

  },[customer.name,customer.address,customer.customerId])
    
  return (

    <Modal
      open={open}
    >
      <Modal.Header>Edit Customer</Modal.Header>
      <Modal.Content image>
      <Form>
    <Form.Field>
      <label>Name</label>
      <input  Value={props.customer.name} onChange={e => setName(e.target.value)}></input>
    </Form.Field>
    <Form.Field>
      <label>Address</label>
      <input Value={props.customer.address} onChange={e => setAddress(e.target.value)}/>
    </Form.Field>
  </Form>
      </Modal.Content>
      <Modal.Actions>
      <Button onClick={()=>editCustomer(name,address)} type='submit'color='green'><Icon name='check'/>Edit</Button>
      <Button onClick={() => closeModal(false)} color='black'>Cancel</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default EditCustomer