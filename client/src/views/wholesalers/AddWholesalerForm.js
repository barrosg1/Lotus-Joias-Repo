import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import {
    Row,
    Col,
    Form,
    FormGroup,
    Input,
    Button,
    Card,
    CardBody,

} from 'reactstrap';
import { isEmpty } from 'utils/isEmpty';

import { addWholesaler } from 'redux/actions/wholesalerAction';
import { useDispatch } from 'react-redux';


const AddWholesalerForm = () => {

    const dispatch = useDispatch();

    // ============== STATES ==============

    const [staffArray, setStaffArray] = useState([{ staffName: '', staffPhone: '' }]);
    const [isInputDisabled, setIsInputDisabled] = useState(false);

    const [addressData, setAddressData] = useState({
        streetName: '',
        streetNumber: '',
        streetAddon: '',
        district: '',
        city: '',
        state: '',
        zipCode: '',
    });

    const [formData, setFormData] = useState({
        name: 'Pandora',
        cnpj: '2348456879',
        stateRegistration: '123456789',
        phone: '2019384859',
        email: 'teodoro@pandora.com',
        zipCodeSearch: '',
    });

    const {
        name,
        cnpj,
        stateRegistration,
        phone,
        email,
        zipCodeSearch,
    } = formData;

    const {
        streetName,
        streetNumber,
        streetAddon,
        district,
        city,
        state,
        zipCode,
    } = addressData;

    // ============== FUNCTIONS ==============

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onAddressChange = e => setAddressData({ ...addressData, [e.target.name]: e.target.value });
    const addStaff = () => setStaffArray([...staffArray, { staffName: '', staffPhone: '' }]);

    const handleStaffInput = (index, event) => {
        const values = [...staffArray];
        values[index][event.target.name] = event.target.value;

        setStaffArray(values);
    }

    /* find address by zip code and 
    populate data in the address forms */
    const findAddress = async () => {

        if (!zipCodeSearch) { alert('Zip Code is required'); return; }

        try {

            const data = { zipCodeSearch };
            const searchedAddress = await axios.post(`/api/wholesaler/search/address`, data);

            if (!searchedAddress || isEmpty(searchedAddress.data)) { alert("Could not find this zip code"); return; }

            const { logradouro, bairro, cidade, uf, cep } = searchedAddress.data;

            setAddressData({
                ...addressData,
                streetName: logradouro,
                district: bairro,
                city: cidade,
                state: uf,
                zipCode: cep,

            });

            setIsInputDisabled(true);

        } catch (error) {

            console.log(error);
        }
    }

    const onSubmit = async e => {
        e.preventDefault();

        const address = addressData;
        const staff = staffArray;

        const newWholesaler = {
            name,
            cnpj,
            stateRegistration,
            phone,
            email,
            address,
            staff
        };

        dispatch(addWholesaler(newWholesaler));

    }

    return (
        <Col lg="12">
            <Card className="bg-secondary shadow">
                <CardBody>
                    <Form onSubmit={(e) => onSubmit(e)}>
                        <h6 className="heading-small text-muted mb-4">
                            Sobre o Fornecedor
                        </h6>
                        <div className="pl-lg-4">
                            <Row>
                                <Col sm="4">
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
                                <Col sm="4">
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
                                <Col sm="4">
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
                            <Row >
                                <Col sm="4">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-phone"
                                        >
                                            CEP
                                        </label>
                                        <Input
                                            className="form-control-alternative mb-3"
                                            placeholder="Digite o CEP"
                                            type="number"
                                            name='zipCodeSearch'
                                            value={zipCodeSearch}
                                            onChange={e => onChange(e)}

                                        />
                                        <Button
                                            color="primary"
                                            onClick={() => findAddress()}
                                        >
                                            Buscar
                                        </Button>
                                    </FormGroup>
                                </Col>


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
                                            onChange={e => onAddressChange(e)}

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
                                            type="number"
                                            name='streetNumber'
                                            value={streetNumber}
                                            onChange={e => onAddressChange(e)}
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
                                            onChange={e => onAddressChange(e)}
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
                                            onChange={e => onAddressChange(e)}

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
                                            onChange={e => onAddressChange(e)}
                                            disabled={isInputDisabled}
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
                                            onChange={e => onAddressChange(e)}
                                            disabled={isInputDisabled}
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
                                            onChange={e => onAddressChange(e)}
                                            disabled={isInputDisabled}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                        <hr />

                        <h6 className="heading-small text-muted mb-4">
                            Vendedor / Representante
                        </h6>

                        <div className="pl-lg-4">

                            {
                                staffArray.map((staff, index) => {
                                    return (
                                        <>
                                            <Row key={index}>
                                                <label
                                                    className="form-control-label mb-4"

                                                >
                                                    Vendedor {index + 1}
                                                </label>
                                            </Row>
                                            <Row>
                                                <Col sm="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-staff"
                                                        >
                                                            Nome
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            placeholder="Nome"
                                                            type="text"
                                                            name='staffName'
                                                            value={staff.staffName}
                                                            onChange={e => handleStaffInput(index, e)}

                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col sm="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-staff"
                                                        >
                                                            Telefone
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            placeholder="Telefone"
                                                            type="phone"
                                                            name='staffPhone'
                                                            value={staff.staffPhone}
                                                            onChange={e => handleStaffInput(index, e)}

                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </>
                                    )
                                })
                            }

                        </div>

                        <Row>
                            <Col sm="12" style={{ display: 'flex', justifyContent: 'center' }}>
                                <FontAwesomeIcon
                                    type="button"
                                    style={{ height: 50, width: 50 }}
                                    onClick={() => addStaff()}
                                    className="mb-5"
                                    icon={faPlusCircle}
                                />
                            </Col>
                        </Row>
                        <Button className="submit-btn" type="submit">Submit</Button>
                    </Form>
                </CardBody>
            </Card>
        </Col>
    )
}

export default AddWholesalerForm;
