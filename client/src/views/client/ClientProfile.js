
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Input,
    Button,
    Card,
    CardHeader,
    CardBody,
    Media,
    Spinner,
    Modal,
    ModalHeader,
} from 'reactstrap'

import React, { useState, useEffect } from 'react'
import GeneralHeader from 'components/Headers/GeneralHeader';
import { useSelector, useDispatch } from 'react-redux';

import Alert from '../../layouts/Alert';

import { getClient, editClient } from '../../redux/actions/clientActions';
import TransactionTable from 'views/transaction/TransactionTable';

const ClientProfile = ({ match }) => {

    const dispatch = useDispatch();

    const client = useSelector(state => state.clientReducer.client);
    const loading = useSelector(state => state.clientReducer.loading);

    // modal
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        notes: '',

    });

    useEffect(() => {

        dispatch(getClient(match.params.client_id));

        setFormData({
            firstName: !loading && client.firstName ? client.firstName : '',
            lastName: !loading && client.lastName ? client.lastName : '',
            phone: !loading && client.phone ? client.phone : '',
            email: !loading && client.email ? client.email : '',
            address: !loading && client.address ? client.address : '',
            notes: !loading && client.notes ? client.notes : '',

        });

    }, [dispatch, match, loading]);


    const { firstName, lastName, phone, email, address, notes } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

        const updatedClient = {
            firstName,
            lastName,
            phone,
            email,
            address,
            notes
        }

        console.log(`Updated Client: ${JSON.stringify(updatedClient)}`);

        dispatch(editClient(updatedClient, match.params.client_id));

        toggle();

    }

    return (
        <>

            {
                loading ? (<Spinner color='primary' />)
                    :
                    (
                        <Row>
                            <Col xl="3" className="mb-3">
                                <Card className="card-profile shadow">
                                    <Row className="justify-content-center pt-5">
                                        <Media
                                            alt="..."
                                            className="rounded-circle"
                                            src={client.avatar}
                                        />
                                    </Row>
                                    <CardBody >

                                        <div className="text-center">
                                            <h3>
                                                {client.firstName} {client.lastName}
                                            </h3>
                                            <hr className="my-4" />
                                            <p>
                                                Client Since: {client.date}
                                            </p>
                                        </div>

                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="5" className="mb-3">
                                <Card className="bg-secondary shadow">
                                    <Alert />
                                    <CardHeader className="bg-white border-0">
                                        <Row className="align-items-center">
                                            <div className="col">
                                                <h3 className="mb-0">Contact Information</h3>
                                            </div>
                                            <div className="col text-right">
                                                <Button
                                                    color="primary"
                                                    size="sm"
                                                    onClick={toggle}
                                                >
                                                    Edit
                                                </Button>
                                            </div>
                                            <Modal isOpen={modal} toggle={toggle} className="modal-client">
                                                <ModalHeader toggle={toggle} />
                                                <Col sm="12">
                                                    <Card className="bg-secondary shadow">
                                                        <Alert />
                                                        <CardHeader className="bg-white border-0">
                                                            <Row className="align-items-center">
                                                                <Col xs="8">
                                                                    <h3 className="mb-0">Edit Client</h3>
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
                                                <br />
                                            </Modal>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col sm={4}>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-last-name"
                                                >
                                                    First Name
                                                </label>
                                                <p>{client.firstName}</p>
                                            </Col>
                                            <Col sm={4}>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-last-name"
                                                >
                                                    Last Name
                                                </label>
                                                <p>{client.lastName}</p>
                                            </Col>
                                            <Col sm={4}>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-last-name"
                                                >
                                                    Phone
                                                </label>
                                                <p>{client.phone}</p>
                                            </Col>
                                        </Row>
                                        <hr />
                                        <Row>
                                            <Col sm={6}>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-last-name"
                                                >
                                                    Email
                                                </label>
                                                <p>{client.email}</p>
                                            </Col>
                                            <Col sm={6}>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-last-name"
                                                >
                                                    Address:
                                                </label>
                                                <p>{client.address}</p>
                                            </Col>

                                        </Row>
                                        <hr />
                                        <Row>
                                            <Col sm={12}>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-last-name"
                                                >
                                                    Notes:
                                                </label>
                                                <p>{client.notes}</p>
                                            </Col>
                                        </Row>

                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="4">
                                <Card className="bg-secondary shadow">
                                    <CardHeader className="bg-white border-0">
                                        <Row className="align-items-center">
                                            <div className="col">
                                                <h3 className="mb-0">Recent Transactions</h3>
                                            </div>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <TransactionTable />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    )
            }
        </>
    )
}

export default ClientProfile;
