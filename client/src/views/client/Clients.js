import MUIDataTable from "mui-datatables";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

// reactstrap components
import { Button } from "reactstrap";

import { getClients } from '../../redux/actions/clientActions';

const Clients = ({ history }) => {

    const dispatch = useDispatch();

    const { clients, loading } = useSelector(state => state.clientReducer);

    useEffect(() => {

        dispatch(getClients());

    }, [dispatch, loading]);


    const goToClientPage = (id) => history.push(`/admin/client-profile/${id}`);


    const columns = [

        {
            name: 'View Client',
            options: {
                customBodyRender: (clientId) => {
                    return (
                        <Button onClick={() => goToClientPage(clientId)} color="secondary">View</Button>
                    );
                },
                filter: false
            }

        },
        {
            name: 'First Name',
            options: {
                filter: false
            }
        },
        {
            name: 'Last Name',
            options: {
                filter: false
            }
        },
        {
            name: 'Email',
            options: {
                filter: false
            }
        },
        {
            name: 'Phone',
            options: {
                filter: false
            }
        },
        {
            name: 'Address',
            options: {
                filter: false
            }
        },
    ]

    const constructedData = () => {
        const clientList = [];

        !loading && clients && clients.forEach(client => {

            clientList.unshift({
                "View Client": client._id,
                "First Name": client.firstName,
                "Last Name": client.lastName,
                "Email": client.email,
                "Phone": client.phone,
                "Address": client.address,

            });
        });

        return clientList;
    }

    const options = {
        responsive: 'responsive',
        selectableRows: false,
        rowsPerPageOptions: [5, 10, 25]
    };

    return (
        <MUIDataTable
            title={"Clients"}
            data={constructedData()}
            columns={columns}
            options={options}
        />
    )

}

export default Clients;













