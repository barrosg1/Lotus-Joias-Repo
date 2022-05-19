// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Media,

} from "reactstrap";

import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import { login } from '../../redux/actions/authActions';

import Alert from '../../layouts/Alert';

const Login = () => {

  const dispatch = useDispatch();

  const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState('password');

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    dispatch(login({ email, password }));

  }

  // redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/admin' />
  }

  const togglePassword = () => {
    if (showPassword === 'password') {
      setShowPassword('text');
    } else {
      setShowPassword('password');
    }
  }

  const imgStyle = {
    maxHeight: 128,
    maxWidth: 128,
    display: 'block',
    margin: 'auto'
  }

  return (
    <Col lg="5" md="7">
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent pb-5">
          <Alert />
          <Media object style={imgStyle} src={
            require("../../assets/img/brand/Logo-02.png")
              .default
          } />

        </CardHeader>
        <CardBody className="px-lg-5 py-lg-5">
          <Form onSubmit={(e) => onSubmit(e)}>
            <FormGroup className="mb-3">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Email"
                  type="email"
                  autoComplete="new-email"
                  name='email'
                  value={email}
                  onChange={e => onChange(e)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Password"
                  type={showPassword}
                  autoComplete="new-password"
                  name='password'
                  value={password}
                  onChange={e => onChange(e)}
                />
              </InputGroup>
            </FormGroup>
            <center><Input type="checkbox" onClick={() => togglePassword()} />{' '}
              Show Password
            </center>
            <div className="text-center">
              <Button className="submit-btn" color="primary" type="submit">
                Sign in
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Login;
