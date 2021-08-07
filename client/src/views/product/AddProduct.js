
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from 'redux/actions/productActions';
import Alert from '../../layouts/Alert';
import { getProductCategories } from 'redux/actions/categoryActions';

import {
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
} from 'reactstrap';


const AddProduct = () => {

    const dispatch = useDispatch();

    const productCategories = useSelector(state => state.categoryReducer.productCategories);

    useEffect(() => {
        dispatch(getProductCategories());

    }, [dispatch]);

    const [formData, setFormData] = useState({
        category: '',
        name: 'Some Product',
        wholesalePrice: '2.99',
        retailPrice: '19.00',
        wholesaler: 'rarissima',
        description: '',
        purchaseDate: '2021-08-03',
        quantity: '100',
        warrantyDate: '2021-08-03',
        maxDiscount: '10',
    });

    const [image, setImage] = useState('');

    // const [selectedFile, setSelectedFile] = useState();
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

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

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

    const onSubmit = async e => {
        e.preventDefault();

        console.log(`Image Name: ${image}`);

        const newProduct = {
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

        dispatch(addProduct(newProduct));

    }

    return (
        <>
            <Alert />
            <Col lg="12">
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
                                                placeholder="Choose Category"
                                                value={category}
                                                onChange={e => onChange(e)}
                                            >
                                                <option> </option>
                                                {
                                                    productCategories && productCategories.map((productCategory, key) => (
                                                        <option key={key}>{productCategory.name}</option>
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

                            <div className="pl-lg-4">
                                <Row>
                                    <Col sm="3">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-wholesale-price"
                                            >
                                                Purchase Date
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                placeholder="Purchase Date"
                                                type="date"
                                                name='purchaseDate'
                                                value={purchaseDate}
                                                onChange={e => onChange(e)}
                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col sm="2">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-retail-price"
                                            >
                                                Quantity
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                placeholder="Quantity"
                                                type="text"
                                                name='quantity'
                                                value={quantity}
                                                onChange={e => onChange(e)}
                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col sm="3">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-retail-price"
                                            >
                                                Warranty Date
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                placeholder="Warranty Date"
                                                type="date"
                                                name='warrantyDate'
                                                value={warrantyDate}
                                                onChange={e => onChange(e)}
                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col sm="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-retail-price"
                                            >
                                                Maximum Discount
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                placeholder="Maximum Discount"
                                                type="text"
                                                name='maxDiscount'
                                                value={maxDiscount}
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
                                            // name="image"
                                            // value={image}
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
        </>
    )
}

export default AddProduct;
