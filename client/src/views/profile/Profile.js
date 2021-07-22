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
  Container,
  Row,
  Col,
  Media
} from "reactstrap";

import { connect } from "react-redux";
import PropTypes from 'prop-types';

import GeneralHeader from '../../components/Headers/GeneralHeader';
import { useState, useEffect } from 'react';
import { loadUser } from "redux/actions/authActions";



const Profile = ({ user }) => {

  if (!user) {

    user = JSON.parse(localStorage.getItem('user'));

  }

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    notes: user.notes
  });


  const { firstName, lastName, email, password, notes } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


  const onSubmit = async e => {
    e.preventDefault();

    const newProduct = {
      firstName,
      lastName,
      email,
      password,
      notes
    }

    // addProducts(newProduct);

  }

  return (
    <>
      {
        !user ? <p>Loading...</p>

          :
          <>
            <GeneralHeader />

            <Container fluid>
              <Row>
                <Col xl="4">
                  <Card className="card-profile shadow">
                    <Row className="justify-content-center pt-5">
                      <Media
                        alt="..."
                        className="rounded-circle"
                        src={user.avatar}
                      />
                    </Row>

                    <CardBody >

                      <div className="text-center">
                        <h3>
                          {user.firstName} {user.lastName}
                        </h3>
                        <div>
                          Role: Admin
                        </div>
                        <hr className="my-4" />
                        <p>
                          Email: {user.email}
                        </p>
                        <p>
                          Date created: {user.date}
                        </p>
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Show more
                        </a>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col className="order-xl-1" xl="8">
                  <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                      <Row className="align-items-center">
                        <Col xs="8">
                          <h3 className="mb-0">My account</h3>
                        </Col>
                      </Row>
                    </CardHeader>
                    <CardBody>
                      <Form>
                        <h6 className="heading-small text-muted mb-4">
                          User information
                        </h6>
                        <div className="pl-lg-4">

                          <Row>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-first-name"
                                >
                                  First name
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  type="text"
                                  name='firstName'
                                  value={firstName}
                                  onChange={e => onChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-last-name"
                                >
                                  Last name
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  type="text"
                                  name='lastName'
                                  value={lastName}
                                  onChange={e => onChange(e)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-first-name"
                                >
                                  Email
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  type="email"
                                  name='email'
                                  value={email}
                                  onChange={e => onChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-last-name"

                                >
                                  Password
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  type="password"
                                  name='password'
                                  value={password}
                                  onChange={e => onChange(e)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>

                        <hr className="my-4" />
                        {/* Description */}
                        <h6 className="heading-small text-muted mb-4">About me</h6>
                        <div className="pl-lg-4">
                          <FormGroup>
                            <label>About Me</label>
                            <Input
                              className="form-control-alternative"
                              rows="4"
                              type="textarea"
                              name='notes'
                              value={notes}
                              onChange={e => onChange(e)}
                            />
                          </FormGroup>
                        </div>

                        <Button className="submit-btn" type="submit">Submit</Button>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </>

      }

    </>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: state.authReducer.user
});

export default connect(mapStateToProps, { loadUser })(Profile);