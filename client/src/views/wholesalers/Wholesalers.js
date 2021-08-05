
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import GeneralHeader from 'components/Headers/GeneralHeader';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types'
import Alert from '../../layouts/Alert';

import { addWholesaler, getWholesalers } from 'redux/actions/wholesalerAction';


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
} from 'reactstrap';
import { isEmpty } from 'utils/isEmpty';




const Wholesalers = ({ addWholesaler, getWholesalers }) => {

    const productCategories = useSelector(state => state.categoryReducer.productCategories);

    useEffect(() => {

        getWholesalers();

    }, [getWholesalers]);

    const [formData, setFormData] = useState({
        name: 'Pandora',
        cnpj: '123456789',
        stateRegistration: '12345',
        phone: '2013458478',
        email: 'sales@pandora.com',
        address: {},
        streetName: '',
        streetNumber: '',
        streetAddon: '',
        district: '',
        city: '',
        state: '',
        zipCode: '',
        staff: []
    });

    const [addressFormData, setAddressFormData] = useState({
        streetName: '',
        streetNumber: '',
        streetAddon: '',
        district: '',
        city: '',
        state: '',
        zipCode: '',
    });


    const {
        name,
        cnpj,
        stateRegistration,
        phone,
        email,
        streetName,
        streetNumber,
        streetAddon,
        district,
        city,
        state,
        zipCode,
        staff
    } = formData;



    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const findAddress = async (zipCode) => {

        if (isEmpty(zipCode)) {
            alert('Zip Code is required');
            return;
        }

        try {

            const data = { zipCode }

            const address = await axios.get(`/api/wholesaler/search/address`, data);

            if (isEmpty(address)) alert("Could not find this zip code")

            setAddressFormData({
                ...state,
                streetName: address.logradouro,
                district: address.bairro,
                city: address.cidade,
                state: address.uf
            })

        } catch (error) {

            console.log(error);
        }

    }

    const onSubmit = async e => {
        e.preventDefault();

        const newWholesaler = {
            name,
            cnpj,
            stateRegistration,
            phone,
            email,
            address: addressFormData,
            staff
        }

        addWholesaler(newWholesaler);

    }

    return (
        <>
            <GeneralHeader />
            <Container>
                <Alert />
                <Col lg="12">
                    <Card className="bg-secondary shadow">
                        <CardHeader className="bg-white border-0">
                            <Row className="align-items-center">
                                <Col xs="8">
                                    <h3 className="mb-0">Novo Fornecedor</h3>
                                </Col>

                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={(e) => onSubmit(e)}>
                                <h6 className="heading-small text-muted mb-4">
                                    Sobre o Fornecedor
                                </h6>
                                <div className="pl-lg-4">
                                    <Row>
                                        <Col lg="4">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-name"
                                                >
                                                    Nome do Fornecedor
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
                                                    htmlFor="input-cnpj"
                                                >
                                                    CNPJ
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    placeholder="CNPJ"
                                                    type="number"
                                                    name='cnpj'
                                                    value={cnpj}
                                                    onChange={e => onChange(e)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="4">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-stateRegistration"
                                                >
                                                    Inscrição Estadual
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    placeholder="inscrição estadual"
                                                    type="number"
                                                    name='stateRegistration'
                                                    value={stateRegistration}
                                                    onChange={e => onChange(e)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </div>
                                <hr />
                                <h6 className="heading-small text-muted mb-4">
                                    Contato
                                </h6>
                                <div className="pl-lg-4">
                                    <Row>
                                        <Col sm="6">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-wholesaler-phone"
                                                >
                                                    Telefone
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    placeholder="Purchase Date"
                                                    type="phone"
                                                    name='phone'
                                                    value={phone}
                                                    onChange={e => onChange(e)}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col sm="6">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-retail-price"
                                                >
                                                    Email
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    placeholder="Quantity"
                                                    type="text"
                                                    name='email'
                                                    value={email}
                                                    onChange={e => onChange(e)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </div>
                                <hr />
                                <h6 className="heading-small text-muted mb-4">
                                    Endereço
                                </h6>
                                <div className="pl-lg-4">
                                    <Row className="align-items-center">
                                        <Col sm="4">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-phone"
                                                >
                                                    CEP
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    placeholder="Digite seu CEP"
                                                    type="text"
                                                    name='zipCode'
                                                    value={zipCode}
                                                    onChange={e => onChange(e)}
                                                />

                                            </FormGroup>

                                        </Col>
                                        <Button
                                            color="primary"
                                            size="sm"
                                            onClick={() => findAddress(zipCode)}
                                        >
                                            Buscar
                                        </Button>

                                    </Row>

                                    <Row>
                                        <Col sm="4">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-address"
                                                >
                                                    Endereço
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    placeholder="Endereço"
                                                    type="text"
                                                    name='streetName'
                                                    value={streetName}
                                                    onChange={e => onChange(e)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="4">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-number"
                                                >
                                                    Número
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    placeholder="Número"
                                                    type="text"
                                                    name='streetNumber'
                                                    value={streetNumber}
                                                    onChange={e => onChange(e)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="4">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-streetAddon"
                                                >
                                                    Complemento (Opcional)
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    placeholder="Complemento"
                                                    type="text"
                                                    name='streetAddon'
                                                    value={streetAddon}
                                                    onChange={e => onChange(e)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col sm="4">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-city"
                                                >
                                                    Bairro
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    placeholder="Cidade"
                                                    type="text"
                                                    name='district'
                                                    value={district}
                                                    onChange={e => onChange(e)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="3">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-city"
                                                >
                                                    Cidade
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    placeholder="Cidade"
                                                    type="text"
                                                    name='city'
                                                    value={city}
                                                    onChange={e => onChange(e)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="3">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-zipCode"
                                                >
                                                    CEP
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    placeholder="CEP"
                                                    type="text"
                                                    name='zipCode'
                                                    value={zipCode}
                                                    onChange={e => onChange(e)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="2">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-state"
                                                >
                                                    Estado
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    placeholder="Estado"
                                                    type="text"
                                                    name='state'
                                                    value={state}
                                                    onChange={e => onChange(e)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </div>
                                <hr />

                                <Button className="submit-btn" type="submit">Submit</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Container>
        </>
    )
}

Wholesalers.propTypes = {
    addWholesaler: PropTypes.func.isRequired,
    getWholesalers: PropTypes.func.isRequired,
}

export default connect(null, { addWholesaler, getWholesalers })(Wholesalers);
