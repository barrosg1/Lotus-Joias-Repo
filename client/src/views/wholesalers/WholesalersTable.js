import MUIDataTable from "mui-datatables";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getWholesalers } from 'redux/actions/wholesalerAction';
import { Button } from "reactstrap";

// ========== Wholsalers Table ==========

const WholesalersTable = () => {

    const dispatch = useDispatch();
    let history = useHistory();

    // from state
    const wholesalers = useSelector(state => state.wholesalerReducer.wholesalers);
    const loading = useSelector(state => state.wholesalerReducer.loading);

    useEffect(() => {

        dispatch(getWholesalers());


    }, [loading, dispatch]);

    // functions
    const goToWholesalerPage = (wholesalerId) => history.push(`/admin/edit-wholesaler/${wholesalerId}`);


    const columns = [

        {
            name: 'Ver Detalhes',
            options: {
                customBodyRender: (id) => {

                    return (

                        <Button onClick={() => goToWholesalerPage(id)} size="sm" color="secondary">Ver Detalhes</Button>
                    );
                },
                filter: false
            }
        },
        {
            name: 'Nome',
            options: {
                filter: false
            }
        },
        {
            name: 'CNPJ',
            options: {
                filter: false
            }
        },
        {
            name: 'Inscrição Estadual',
            options: {
                filter: false
            }
        },
        {
            name: 'Telefone',
            options: {
                filter: false
            }
        },
        {
            name: 'Email',
            options: {
                filter: false
            }
        }
    ];

    // display user data
    const displayWholesalers = () => {
        const wholesalerList = [];

        wholesalers && wholesalers.forEach(wholesaler => {
            wholesalerList.push({
                "Ver Detalhes": wholesaler._id,
                "Nome": wholesaler.name,
                "CNPJ": wholesaler.cnpj,
                "Inscrição Estadual": wholesaler.stateRegistration,
                "Telefone": wholesaler.phone,
                "Email": wholesaler.email
            });
        });

        return wholesalerList;
    }


    const options = {
        responsive: 'responsive',
        selectableRows: false,
        download: false,
        print: false,
        viewColumns: false,
        rowsPerPageOptions: [10]
    };


    return (
        <MUIDataTable

            data={displayWholesalers()}
            columns={columns}
            options={options}
        />
    )
}

export default WholesalersTable;













