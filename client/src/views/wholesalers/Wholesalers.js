

import React, { useState } from 'react'
import GeneralHeader from 'components/Headers/GeneralHeader';
import { Container } from 'reactstrap';
import Alert from '../../layouts/Alert';

import WholesalersTable from './WholesalersTable';
import AddWholesalerForm from './AddWholesalerForm';

const Wholesalers = () => {

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    return (
        <>
            <Alert />
            <div className="bloc-tabs">
                <button
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(1)}
                >
                    Ver todos os fornecedores

                </button>
                <button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(2)}
                >
                    Adicionar novo fornecedor
                </button>
            </div>

            <div className="content-tabs">
                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                    <WholesalersTable />
                </div>
                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                    <h2>Novo Fornecedor</h2>
                    <hr />
                    <AddWholesalerForm />
                </div>
            </div>

        </>
    )
}

export default Wholesalers;
