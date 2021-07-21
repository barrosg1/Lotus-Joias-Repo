
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
} from 'reactstrap'

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import GeneralHeader from 'components/Headers/GeneralHeader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { addProduct } from 'redux/actions/productActions';



const AddProduct = ({ addProduct }) => {

    const [formData, setFormData] = useState({
        name: '',
        wholesalePrice: '',
        retailPrice: '',
        wholesaler: '',
        image: '',
        description: '',
    });

    const [fileUpload, setFileUpload] = useState({ imageFileURL: '' });

    const { name, wholesalePrice, retailPrice, wholesaler, image, description } = formData;
    const imageFileURL = fileUpload.imageFileURL;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleImageChange = e => {

        setFileUpload({ imageFileURL: URL.createObjectURL(e.target.files[0]) });
        setFormData({ ...formData, image: e.target.value });

    }

    const onSubmit = async e => {
        e.preventDefault();

        const newProduct = {
            name,
            wholesalePrice,
            retailPrice,
            wholesaler,
            image: imageFileURL,
            description,
        }

        addProduct(newProduct);

        alert('Product saved')
    }

    return (
        <>
            <GeneralHeader />
            <Container>
                <Col xl="12">
                    <Card className="bg-secondary shadow">
                        <CardHeader className="bg-white border-0">
                            <Row className="align-items-center">
                                <Col xs="8">
                                    <h3 className="mb-0">New Product</h3>
                                </Col>

                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={(e) => onSubmit(e)}>
                                <h6 className="heading-small text-muted mb-4">
                                    Product information
                                </h6>
                                <div className="pl-lg-4">
                                    <Row>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-name"
                                                >
                                                    Product name
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    placeholder="Product Name"
                                                    type="text"
                                                    name='name'
                                                    value={name}
                                                    onChange={e => onChange(e)}

                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-bought-from"
                                                >
                                                    Bought From
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    placeholder="Bought From"
                                                    type="text"
                                                    name='wholesaler'
                                                    value={wholesaler}
                                                    onChange={e => onChange(e)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </div>

                                <div className="pl-lg-4">
                                    <Row>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-wholesale-price"
                                                >
                                                    Wholesale Price
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    placeholder="Wholesale Price"
                                                    type="text"
                                                    name='wholesalePrice'
                                                    value={wholesalePrice}
                                                    onChange={e => onChange(e)}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col lg="6">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-retail-price"
                                                >
                                                    Retail Price
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    placeholder="Retail Price"
                                                    type="text"
                                                    name='retailPrice'
                                                    value={retailPrice}
                                                    onChange={e => onChange(e)}
                                                />
                                            </FormGroup>
                                        </Col>

                                    </Row>
                                </div>

                                <Row>
                                    <Col ls="12">
                                        <div className="pl-lg-4">
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-retail-price"
                                            >
                                                Product Description
                                            </label>
                                            <FormGroup>
                                                <Input
                                                    className="form-control-alternative"
                                                    placeholder="Product Description"
                                                    rows="4"
                                                    type="textarea"
                                                    name='description'
                                                    value={description}
                                                    onChange={e => onChange(e)}
                                                />
                                            </FormGroup>
                                        </div>
                                    </Col>
                                </Row>

                                <hr className="my-4" />

                                <Row>
                                    <Col sm={12}>
                                        <div className="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
                                            <Input
                                                id="upload"
                                                type="file"
                                                className="form-control border-0"
                                                onChange={e => handleImageChange(e)}
                                                name="image"
                                                value={image}
                                                accept="image/*"
                                            />
                                            <Label id="upload-label" for="upload" className="font-weight-light text-muted">Upload Image</Label>
                                            <div className="input-group-append">
                                                <Label for="upload" className="btn btn-light m-0 rounded-pill px-4">
                                                    <FontAwesomeIcon className="mr-2 text-muted" icon={faUpload} />
                                                    <small className="text-uppercase font-weight-bold text-muted">Choose file</small>
                                                </Label>
                                            </div>
                                        </div>

                                        <p className="font-italic text-black text-center">The image uploaded will be rendered inside the box below.</p>
                                        <div className="image-area mt-4">
                                            {
                                                imageFileURL ?
                                                    <img
                                                        id="imageResult"
                                                        src={imageFileURL}
                                                        alt=""
                                                        className="img-fluid rounded shadow-sm mx-auto d-block"
                                                    /> :

                                                    <p>Uploaded image result</p>
                                            }
                                        </div>
                                    </Col>
                                </Row>

                                <Button className="submit-btn" type="submit">Submit</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Container>
        </>
    )
}

AddProduct.propTypes = {
    addProduct: PropTypes.func.isRequired,
}

export default connect(null, { addProduct })(AddProduct);
