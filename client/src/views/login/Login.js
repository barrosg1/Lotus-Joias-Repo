/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

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
  Row,
  Col,
  Media
} from "reactstrap";

import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types'
import { login } from '../../redux/actions/authActions';


const Login = ({ login, isAuthenticated }) => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    login({ email, password });

  }

  // redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/admin' />
  }

  const imgStyle = {
    maxHeight: 128,
    maxWidth: 128,
    display: 'block',
    margin: 'auto'
  }

  return (
    <>

      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
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
                    type="password"
                    autoComplete="new-password"
                    name='password'
                    value={password}
                    onChange={e => onChange(e)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
