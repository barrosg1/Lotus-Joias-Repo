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

import { useDispatch, useSelector } from "react-redux";
import GeneralHeader from '../../components/Headers/GeneralHeader';
import { useState, useEffect } from 'react';
import { loadUser } from "redux/actions/authActions";
import { updateUser } from '../../redux/actions/userActions';
import Alert from '../../layouts/Alert';

const Profile = () => {

  const dispatch = useDispatch();

  const { currentUser, loading } = useSelector(state => state.authReducer);

  const [formData, setFormData] = useState({
    role: currentUser.role,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    password: currentUser.password,
    notes: currentUser.notes
  });


  useEffect(() => {

    dispatch(loadUser());

    setFormData({
      role: !loading && currentUser.role ? currentUser.role : '',
      firstName: !loading && currentUser.firstName ? currentUser.firstName : '',
      lastName: !loading && currentUser.lastName ? currentUser.lastName : '',
      email: !loading && currentUser.email ? currentUser.email : '',
      notes: !loading && currentUser.notes ? currentUser.notes : ''
    })

  }, [
    dispatch,
    loading,
    currentUser.email,
    currentUser.firstName,
    currentUser.lastName,
    currentUser.notes,
    currentUser.role
  ]);


  const { role, firstName, lastName, email, password, notes } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    const updatedUser = {
      role,
      firstName,
      lastName,
      email,
      password,
      notes
    }

    dispatch(updateUser(updatedUser));

  }

  return (
    <>
      <Alert />
      <Row>
        <Col xl="4" className="mb-3">
          <Card className="card-profile shadow">
            <Row className="justify-content-center pt-5">
              <Media
                alt="..."
                className="rounded-circle"
                src={currentUser.avatar}
              />
            </Row>

            <CardBody >

              <div className="text-center">
                <h3>
                  {currentUser.firstName} {currentUser.lastName}
                </h3>
                <div>
                  Role: {currentUser.role}
                </div>
                <hr className="my-4" />
                <p>
                  Email: {currentUser.email}
                </p>
                <p>
                  Date created: {currentUser.date}
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
                      currentUser.role === 'Super Admin' &&
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
    </>
  );
};

export default Profile;