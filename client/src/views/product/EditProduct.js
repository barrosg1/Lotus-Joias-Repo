import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import GeneralHeader from 'components/Headers/GeneralHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types'
import Alert from 'layouts/Alert';

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
    CardImg,
    CardBody,
    Media,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap'


import { getProductCategories } from 'redux/actions/categoryActions';
import { editProduct, getProduct, deleteProduct } from '../../redux/actions/productActions';



const EditProduct = ({ getProduct, editProduct, getProductCategories, deleteProduct, match, history }) => {

    const productCategories = useSelector(state => state.categoryReducer.productCategories);
    const product = useSelector(state => state.productReducer.product);
    const loading = useSelector(state => state.productReducer.loading);

    const [formData, setFormData] = useState({
        category: '',
        name: '',
        wholesalePrice: '',
        retailPrice: '',
        wholesaler: '',
        description: '',
        image: '',
        purchaseDate: '',
        quantity: '',
        warrantyDate: '',
        maxDiscount: '',

    });

    useEffect(() => {

        getProduct(match.params.product_id);
        getProductCategories();

        setFormData({
            category: !loading && product.category ? product.category : '',
            name: !loading && product.name ? product.name : '',
            wholesalePrice: !loading && product.wholesalePrice ? product.wholesalePrice : '',
            retailPrice: !loading && product.retailPrice ? product.retailPrice : '',
            wholesaler: !loading && product.wholesaler ? product.wholesaler : '',
            description: !loading && product.description ? product.description : '',
            purchaseDate: !loading && product.purchaseDate ? product.purchaseDate : '',
            quantity: !loading && product.quantity ? product.quantity : '',
            warrantyDate: !loading && product.warrantyDate ? product.warrantyDate : '',
            maxDiscount: !loading && product.maxDiscount ? product.maxDiscount : '',

        });

    }, [
        match,
        getProduct,
        getProductCategories,
        loading,
        product.name,
        product.wholesalePrice,
        product.retailPrice,
        product.wholesaler,
        product.description,
        product.purchaseDate,
        product.quantity,
        product.warrantyDate,
        product.maxDiscount,
        product.category
    ]
    );

    const [image, setImage] = useState('');
    const [fileUpload, setFileUpload] = useState({ imageFileURL: '' });
    const [fileUploadName, setFileUploadName] = useState('Upload Image');

    const {
        category,
        name,
        wholesalePrice,
        retailPrice,
        wholesaler,
        description,
        purchaseDate,
        quantity,
        warrantyDate,
        maxDiscount
    } = formData;

    const imageFileURL = fileUpload.imageFileURL;

    // modal
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

        console.log(`VALUE: ${e.target.value}`)
    }


    // image upload handler
    const uploadFileHandler = async (e) => {

        const file = e.target.files[0];

        const formData = new FormData();
        formData.append('image', file);

        setFileUploadName(file.name);
        setFileUpload({ imageFileURL: URL.createObjectURL(file) });

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await axios.post('/api/upload', formData, config);

            setImage(data);


        } catch (error) {
            console.error(error);

        }
    }

    const proceedToDelete = () => {
        deleteProduct(match.params.product_id);

        history.push('/admin/products');
    }

    const onSubmit = async e => {
        e.preventDefault();

        const updatedProduct = {
            category,
            name,
            wholesalePrice,
            retailPrice,
            wholesaler,
            description,
            purchaseDate,
            quantity,
            warrantyDate,
            maxDiscount,
            image
        }

        editProduct(updatedProduct, match.params.product_id);

    }

    return (
        <>
            <GeneralHeader />
            <Container fluid>
                <Alert />
                <Row>
                    <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                        <Card className="card-profile shadow">
                            <Row className="justify-content-center">
                                <Col >
                                    <CardImg
                                        top width="100%"
                                        height="300px"
                                        style={{ objectFit: 'cover', objectPosition: ['50', 50] }}
                                        src={!product.image ? require('../../assets/img/random/blank-image.png').default : `http://localhost:5000${product.image}`} alt="product image" />
                                </Col>
                            </Row>
                            <CardBody>
                                <div className="text-center">
                                    <h3>
                                        {product.name}
                                    </h3>

                                    <div className="h5 font-weight-300">
                                        <i className="ni location_pin mr-2" />
                                        Product id: {product._id}
                                    </div>
                                    <div className="h4 mt-4">

                                        Category:
                                    </div><span>{product.category}</span>
                                    <div className="h4 mt-4">

                                        Bought from:
                                    </div><span>{product.wholesaler}</span>
                                    <div className="h4 mt-4">

                                        Wholesale Price:
                                    </div><span>${product.wholesalePrice}</span>
                                    <div className="h4 mt-4">

                                        Retail Price:
                                    </div><span>${product.retailPrice}</span>
                                    <hr className="my-4" />

                                    <Link to="/admin/products">
                                        View all products
                                    </Link>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col xl="8">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">Edit Product</h3>
                                    </div>
                                    <div className="col text-right">
                                        <Button
                                            className="btn-delete"
                                            onClick={toggle}
                                            size="sm"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </Row>
                            </CardHeader>

                            <Modal isOpen={modal} toggle={toggle}>
                                <ModalHeader toggle={toggle}>Are you sure?</ModalHeader>
                                <ModalBody>
                                    Are you sure you want to delete this product?
                                </ModalBody>
                                <ModalFooter>
                                    <Button className="btn-delete" onClick={() => proceedToDelete()}>Delete</Button>{' '}
                                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                                </ModalFooter>
                            </Modal>

                            <CardBody>
                                <Form onSubmit={e => onSubmit(e)}>
                                    <h6 className="heading-small text-muted mb-4">
                                        Product information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-last-name"
                                                    >
                                                        Category
                                                    </label>
                                                    <Input
                                                        type="select"
                                                        name="category"
                                                        value={category}
                                                        onChange={e => onChange(e)}
                                                    >
                                                        {
                                                            productCategories.map(productCategory => (
                                                                <option>{productCategory.name}</option>
                                                            ))
                                                        }
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
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
                                            <Col lg="4">
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
                                                    onChange={uploadFileHandler}
                                                    accept="image/*"
                                                />
                                                <Label id="upload-label" for="upload" className="font-weight-light text-muted">{fileUploadName}</Label>
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
                                                        <Media
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
                </Row>

            </Container>

        </>
    )
}

EditProduct.propTypes = {

    getProduct: PropTypes.func.isRequired,
    editProduct: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    getProductCategories: PropTypes.func.isRequired,
}

export default connect(null, {
    getProduct, editProduct,
    deleteProduct,
    getProductCategories
})(EditProduct);
