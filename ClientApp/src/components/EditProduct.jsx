import React, { useState,useEffect } from 'react'
import { Button, Form, Icon, Modal } from 'semantic-ui-react'
import axios from "axios"

function EditProduct(props) {

    const {open, closeModal,product} = props;
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [id, setId] = useState(product.productId);

    function editProduct(Name,Price){

      if(!Name || !Price)
        {
          console.log("Should have value!!!")
        }
        else {
          let product={
            ProductId:id,
            Name:Name,
            Price:parseInt(Price)
          }
          console.log(product);
          axios.put(`/Products/PutProduct/${id}`, product)

          .then((res)=>{
            console.log("success");
            props.fetchParentData();
          })
          .catch((error)=>console.log("Failed"));
          closeModal(false);
          
        }
      }

  useEffect(() => {
    setName(product.name);
    setPrice(product.price);
    setId(product.productId);

  },[product.name,product.price,product.productId])

  function onChange(e){
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setPrice(e.target.value);
    }
    else{
      alert("Numbers only");
      setPrice(product.price);
    }
  }
    
  return (

    <Modal
      open={open}
    >
      <Modal.Header>Edit Product</Modal.Header>
      <Modal.Content image>
      <Form>
    <Form.Field>
      <label>Name</label>
      <input  Value={props.product.name} onChange={e => setName(e.target.value)}></input>
    </Form.Field>
    <Form.Field>
      <label>Price</label>
      <input Value={props.product.price} onChange={e => onChange(e)}/>
    </Form.Field>
  </Form>
      </Modal.Content>
      <Modal.Actions>
      <Button onClick={()=>editProduct(name,price)} type='submit'color='green'><Icon name='check'/>Edit</Button>
      <Button onClick={() => closeModal(false)} color='black'>Cancel</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default EditProduct