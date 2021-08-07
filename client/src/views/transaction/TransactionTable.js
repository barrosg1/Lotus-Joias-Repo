import {

    Button,
    Collapse,
    Card,
    CardBody

} from "reactstrap";

import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types'

import GeneralHeader from '../../components/Headers/GeneralHeader';

import { useSelector } from "react-redux";
import { getTransactions } from '../../redux/actions/transactionActions';


const TransactionTable = ({ getTransactions, history }) => {

    const transactions = useSelector(state => state.transactionReducer.transactions);
    const loading = useSelector(state => state.transactionReducer.loading);

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <div className="transaction-toggle-div" style={{ width: 'auto' }} onClick={toggle}>February 21, 2021</div>
            <Collapse isOpen={isOpen}>
                <Card>
                    <CardBody>
                        Anim pariatur cliche reprehenderit,
                        enim eiusmod high life accusamus terry richardson ad squid. Nihil
                        anim keffiyeh helvetica, craft beer labore wes anderson cred
                        nesciunt sapiente ea proident.
                    </CardBody>
                </Card>
            </Collapse>

            <div className="transaction-toggle-div" style={{ width: 'auto' }} onClick={toggle}>March 3, 2021</div>
            <Collapse isOpen={isOpen}>
                <Card>
                    <CardBody>
                        Anim pariatur cliche reprehenderit,
                        enim eiusmod high life accusamus terry richardson ad squid. Nihil
                        anim keffiyeh helvetica, craft beer labore wes anderson cred
                        nesciunt sapiente ea proident.
                    </CardBody>
                </Card>
            </Collapse>

            <div className="transaction-toggle-div" style={{ width: 'auto' }} onClick={toggle}>June 8, 2021</div>
            <Collapse isOpen={isOpen}>
                <Card>
                    <CardBody>
                        Anim pariatur cliche reprehenderit,
                        enim eiusmod high life accusamus terry richardson ad squid. Nihil
                        anim keffiyeh helvetica, craft beer labore wes anderson cred
                        nesciunt sapiente ea proident.
                    </CardBody>
                </Card>
            </Collapse>

        </div>
    )

}

TransactionTable.propTypes = {
    getTransactions: PropTypes.func.isRequired,
}



export default connect(null, { getTransactions })(TransactionTable);













