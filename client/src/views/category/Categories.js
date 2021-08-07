import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

// reactstrap components
import {
    Row,
    Col,
    FormGroup,
    Input,
    Button,
    Card,
    CardHeader,
    CardBody

} from "reactstrap";

import { addRoleCategory, addProductCategory } from '../../redux/actions/categoryActions';

import Alert from '../../layouts/Alert';
import RoleCategory from "./RoleCategory";
import ProductCategory from "./ProductCategory";

const Categories = () => {

    const dispatch = useDispatch();

    // from state
    const currentUser = useSelector(state => state.authReducer.currentUser);

    // form data
    const [formData, setFormData] = useState({ name: '', table: 'Product' });
    const { name, table } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    // add a category
    const addCategory = () => {

        if (table === 'Roles') {
            dispatch(addRoleCategory({ name }));

        } else {
            dispatch(addProductCategory({ name }))
        }
    }

    return (
        <>

            <Col xl="12">
                <Card className="bg-secondary shadow">
                    <Alert />
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col xs="8">
                                <h3 className="mb-0">New Category</h3>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Row className="align-items-center">
                            <Col sm="4">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-last-name"
                                    >
                                        Category
                                    </label>
                                    <Input
                                        type="select"
                                        name="table"
                                        value={table}
                                        onChange={e => onChange(e)}
                                    >

                                        <option>Products</option>
                                        {
                                            currentUser.role === 'Super Admin' && <option>Roles</option>
                                        }

                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col sm="6">
                                <div className="pl-lg-4">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-name"
                                    >
                                        New Category Name
                                    </label>
                                    <FormGroup>

                                        <Input
                                            className="form-control-alternative"
                                            placeholder="Add a new category"
                                            type="text"
                                            name='name'
                                            value={name}
                                            onChange={e => onChange(e)}

                                        />
                                    </FormGroup>
                                </div>
                            </Col>
                            <Col sm="2">
                                <Button color="primary" onClick={() => addCategory()}>Add</Button>
                            </Col>
                        </Row>

                        <hr />

                        <Row>
                            <Col sm={4} className="mb-5">
                                <RoleCategory />
                            </Col>
                            <Col sm={8}>
                                <ProductCategory />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </>
    )

}

export default Categories;













