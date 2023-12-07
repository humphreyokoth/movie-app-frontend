
import { Form, Button } from 'react-bootstrap';

const LoginForm = () => {
  return (
    <Form>
      <h1>Login</h1>
    
      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  )
}

export default LoginForm;