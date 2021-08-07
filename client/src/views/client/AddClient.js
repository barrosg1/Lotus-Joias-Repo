
import {
    Row,
    Col,
    Form,
    FormGroup,
    Input,
    Button,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap'

import React, { useState } from 'react'
import GeneralHeader from 'components/Headers/GeneralHeader';
import { useDispatch } from 'react-redux';
import Alert from '../../layouts/Alert';

import { addClient } from '../../redux/actions/clientActions';
import { Container } from '@material-ui/core';

const AddClient = () => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        notes: ''
    });

    const { firstName, lastName, phone, email, address, notes } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

        const newProduct = {
            firstName,
            lastName,
            phone,
            email,
            address,
            notes
        }

        dispatch(addClient(newProduct));

    }

    return (
        <>

            <Col sm="12">
                <Card className="bg-secondary shadow">
                    <Alert />
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col xs="8">
                                <h3 className="mb-0">New Client</h3>
                            </Col>

                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Form onSubmit={(e) => onSubmit(e)}>
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
                                                placeholder="First name"
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
                                                placeholder="Last name"
                                                type="text"
                                                name='lastName'
                                                value={lastName}
                                                onChange={e => onChange(e)}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </div>
                            <hr className="my-4" />
                            {/* Address */}
                            <h6 className="heading-small text-muted mb-4">
                                Contact information
                            </h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-address"
                                            >
                                                Address
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                placeholder="Home Address"
                                                type="text"
                                                name='address'
                                                value={address}
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
                                                htmlFor="input-phone"
                                            >
                                                Phone
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                placeholder="Phone"
                                                type="tel"
                                                name='phone'
                                                value={phone}
                                                onChange={e => onChange(e)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-email"
                                            >
                                                Email
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                placeholder="Email"
                                                type="email"
                                                name='email'
                                                value={email}
                                                onChange={e => onChange(e)}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </div>
                            <hr className="my-4" />
                            {/* Description */}
                            <h6 className="heading-small text-muted mb-4">About client</h6>
                            <div className="pl-lg-4">
                                <FormGroup>
                                    <Input
                                        className="form-control-alternative"
                                        placeholder="Notes about this client"
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
        </>
    )
}

export default AddClient;
