import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import PropTypes from 'prop-types'


// reactstrap components
import {

    Container,

} from "reactstrap";

import GeneralHeader from '../../components/Headers/GeneralHeader';
import { getClients } from '../../redux/actions/clientActions';

const Clients = ({ getClients, clients, loading }) => {

    useEffect(() => {

        getClients();

    }, [getClients]);

    let history = useHistory();

    const constructedData = () => {
        const clientList = [];

        !loading && clients && clients.forEach(client => {

            clientList.push({
                "First Name": client.firstName,
                "Last Name": client.lastName,
                "Email": client.email,
                "Phone": client.phone,
                "Address": client.address,

            });
        });

        return clientList;
    }

    const columns = ['First Name', 'Last Name', 'Email', 'Phone', 'Address'];

    const onRowClick = () => {

        history.push("/admin");
    }

    const options = {
        responsive: 'responsive',
        selectableRows: false,
        onRowClick,
        rowsPerPageOptions: [5, 10, 25]
    };


    return (
        <>

            <GeneralHeader />
            <Container>
                <MUIDataTable
                    title={"Clients"}
                    data={constructedData()}
                    columns={columns}
                    options={options}
                />
            </Container>

        </>
    )

}

Clients.propTypes = {
    getClients: PropTypes.func.isRequired,
    clients: PropTypes.object.isRequired,
    loading: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({

    clients: state.clientReducer.clients,
    loading: state.clientReducer.loading

});

export default connect(mapStateToProps, { getClients })(Clients);













