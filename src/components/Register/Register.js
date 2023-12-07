// RegisterForm.js

import { Form, Button } from 'react-bootstrap';

const RegisterForm = () => {
  return (
    <Form>
      <h1>Create your account</h1>
      
      <Form.Group controlId="formName">
        <Form.Label>Full name</Form.Label>
        <Form.Control type="text" />
      </Form.Group>  

      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Register 
      </Button>
    </Form>
  )
}

export default RegisterForm;