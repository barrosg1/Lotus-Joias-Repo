import React, { useEffect, useState } from 'react';
import { connect, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import generator from 'generate-password';
import GeneralHeader from '../../components/Headers/GeneralHeader';

// reactstrap components
import {

    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Button,
    Card,
    CardHeader,
    CardBody

} from "reactstrap";


import Alert from '../../layouts/Alert';
import UsersTable from './UsersTable';
import { getRoleCategories } from '../../redux/actions/categoryActions';
import { addNewUser } from '../../redux/actions/userActions';


const Users = ({ getRoleCategories, addNewUser }) => {

    // from state
    const currentUser = useSelector(state => state.authReducer.currentUser);
    const categories = useSelector(state => state.categoryReducer.categories);

    const [formData, setFormData] = useState({
        role: 'Associate',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState('text');

    const { role, firstName, lastName, email, password } = formData;

    useEffect(() => {
        getRoleCategories();

    }, [getRoleCategories]);


    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


    const generateTempPassword = () => {

        const tempPassword = generator.generate({
            length: 10,
            numbers: true
        });

        setFormData({ ...formData, password: tempPassword });
    }

    const togglePassword = () => {
        if (showPassword === 'password') {

            setShowPassword('text');

        } else {
            setShowPassword('password');
        }
    }

    const onSubmit = async e => {
        e.preventDefault();

        const newUser = {
            role,
            firstName,
            lastName,
            email,
            password,

        }

        addNewUser(newUser);

        setFormData({ ...formData, password: '' });
    }

    return (
        <>
            <GeneralHeader />
            <Container>
                <Col lg="12">
                    <Card className="bg-secondary shadow">
                        <Alert />
                        <CardHeader className="bg-white border-0">
                            <Row className="align-items-center">
                                <Col xs="8">
                                    <h3 className="mb-0">New user</h3>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>

                            {
                                currentUser.role === 'Super Admin'
                                &&

                                (
                                    <>
                                        <Form onSubmit={e => onSubmit(e)}>
                                            <Row className="align-items-center">
                                                <Col lg="2">
                                                    <div className="pl-lg-4">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-last-name"
                                                            >
                                                                Role
                                                            </label>
                                                            <Input
                                                                type="select"
                                                                name="role"
                                                                value={role}
                                                                onChange={e => onChange(e)}
                                                            >
                                                                <option> </option>
                                                                {
                                                                    categories && categories.map((categoryRole, key) => (

                                                                        <option key={key}>{categoryRole.name}</option>
                                                                    ))
                                                                }

                                                            </Input>
                                                        </FormGroup>
                                                    </div>
                                                </Col>
                                                <Col lg="5">
                                                    <div className="pl-lg-4">
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-name"
                                                        >
                                                            First Name
                                                        </label>
                                                        <FormGroup>

                                                            <Input
                                                                className="form-control-alternative"
                                                                placeholder="First Name"
                                                                type="text"
                                                                name='firstName'
                                                                value={firstName}
                                                                onChange={e => onChange(e)}
                                                            />
                                                        </FormGroup>
                                                    </div>
                                                </Col>
                                                <Col lg="5">
                                                    <div className="pl-lg-4">
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-name"
                                                        >
                                                            Last Name
                                                        </label>
                                                        <FormGroup>

                                                            <Input
                                                                className="form-control-alternative"
                                                                placeholder="Last Name"
                                                                type="text"
                                                                name='lastName'
                                                                value={lastName}
                                                                onChange={e => onChange(e)}
                                                            />
                                                        </FormGroup>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm="12" md={{ size: '5', offset: 2 }} >
                                                    <div className="pl-lg-4">
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-name"
                                                        >
                                                            Email
                                                        </label>
                                                        <FormGroup>

                                                            <Input
                                                                className="form-control-alternative"
                                                                placeholder="Email"
                                                                type="email"
                                                                name='email'
                                                                value={email}
                                                                onChange={e => onChange(e)}
                                                            />
                                                        </FormGroup>
                                                    </div>
                                                </Col>
                                                <Col sm="5" >
                                                    <div className="pl-lg-4">
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-name"
                                                        >
                                                            Temporary Password
                                                        </label>
                                                        <FormGroup>
                                                            <Input
                                                                className="form-control-alternative"
                                                                placeholder="Temporary Password"
                                                                type={showPassword}
                                                                name='password'
                                                                value={password}
                                                                onChange={e => onChange(e)}
                                                            />

                                                        </FormGroup>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm="4" md={{ size: 5, offset: 8 }}>
                                                    <div className="align-items-center">
                                                        <Button
                                                            size="sm"
                                                            color="primary"
                                                            style={{ marginRight: 30 }}
                                                            onClick={() => generateTempPassword()}
                                                        >
                                                            Generate Password
                                                        </Button>
                                                        <Label check>
                                                            <Input type="checkbox" onClick={() => togglePassword()} />{' '}
                                                            Show Password
                                                        </Label>

                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Button className="submit-btn" type="submit">Submit</Button>
                                            </Row>
                                        </Form>

                                        <hr />
                                    </>

                                )

                            }

                            <Row>
                                <Col sm="12" md={{ size: 8, offset: 2 }}>
                                    <UsersTable />
                                </Col>
                            </Row>

                        </CardBody>
                    </Card>
                </Col>
            </Container>

        </>
    )

}

Users.propTypes = {
    getRoleCategories: PropTypes.func.isRequired,
    addNewUser: PropTypes.func.isRequired,
    loading: PropTypes.object.isRequired,
}

export default connect(null, { getRoleCategories, addNewUser })(Users);













