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
import { updateUser } from '../../redux/actions/userActions';
import Alert from '../../layouts/Alert';
import { removeAlert } from 'redux/actions/alertActions';

const Profile = ({ loadedUser: { user, loading }, loadUser, updateUser, removeAlert }) => {

  const [formData, setFormData] = useState({
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    notes: user.notes
  });


  useEffect(() => {

    loadUser();

    setFormData({
      role: !loading && user.role ? user.role : '',
      firstName: !loading && user.firstName ? user.firstName : '',
      lastName: !loading && user.lastName ? user.lastName : '',
      email: !loading && user.email ? user.email : '',
      notes: !loading && user.notes ? user.notes : ''
    })

  }, [loadUser, loading, user.email, user.firstName, user.lastName, user.notes, user.role])


  const { role, firstName, lastName, email, password, notes } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    const newProduct = {
      role,
      firstName,
      lastName,
      email,
      password,
      notes
    }

    updateUser(newProduct);

  }

  return (

    <>
      <GeneralHeader />

      <Container fluid>
        <Alert />
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
                    Role: {user.role}
                  </div>
                  <hr className="my-4" />
                  <p>
                    Email: {user.email}
                  </p>
                  <p>
                    Date created: {user.date}
                  </p>
                  {/* <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Show more
                        </a> */}
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
                <Form onSubmit={e => onSubmit(e)}>
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

                      {
                        user.role === 'Super Admin' &&
                        <Col sm="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Change Role
                            </label>
                            <Input
                              type="select"
                              name="role"
                              value={role}
                              onChange={e => onChange(e)}
                            >
                              <option>Super Admin</option>
                              <option>Admin</option>
                              <option>Associate</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      }

                    </Row>
                  </div>

                  <hr className="my-4" />

                  <h6 className="heading-small text-muted mb-4">Notes</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Notes</label>
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

  );
};

Profile.propTypes = {
  auth: PropTypes.object,
  updateUser: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  removeAlert: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loadedUser: state.authReducer
});

export default connect(mapStateToProps, { loadUser, updateUser, removeAlert })(Profile);