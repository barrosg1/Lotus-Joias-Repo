import MUIDataTable from "mui-datatables";
import React, { useState } from 'react';
import { Redirect, useHistory } from "react-router-dom";

// reactstrap components
import {

    Container,

} from "reactstrap";

import GeneralHeader from '../../components/Headers/GeneralHeader';

const Clients = () => {

    let history = useHistory();

    // const [columns, setColumns] = useState(['First Name', 'Last Name', 'Phone', 'Email', 'Address']);

    const [columns, setColumns] = useState([
        {
            name: 'First Name'
        },
        {
            name: 'Last Name'
        },
        {
            name: 'Email'
        },
        {
            name: 'Phone'
        },
        {
            name: 'Address'
        }
    ]);

    const [data, setData] = useState([
        [
            'Gabriel',
            'Barros',
            '3478486073',
            'mcgabe@gmail.com',
            'xyz'
        ],
        [
            'Mariana',
            'Souza',
            '9478486073',
            'msouza@gmail.com',
            '200 Balwin'
        ],
        [
            'Gabriel',
            'Barros',
            '3478486073',
            'mcgabe@gmail.com',
            'xyz'
        ],
        [
            'Mariana',
            'Souza',
            '9478486073',
            'msouza@gmail.com',
            '200 Balwin'
        ],
        [
            'Gabriel',
            'Barros',
            '3478486073',
            'mcgabe@gmail.com',
            'xyz'
        ],
        [
            'Mariana',
            'Souza',
            '9478486073',
            'msouza@gmail.com',
            '200 Balwin'
        ],
        [
            'Mariana',
            'Souza',
            '9478486073',
            'msouza@gmail.com',
            '200 Balwin'
        ],
        [
            'Gabriel',
            'Barros',
            '3478486073',
            'mcgabe@gmail.com',
            'xyz'
        ],
        [
            'Mariana',
            'Souza',
            '9478486073',
            'msouza@gmail.com',
            '200 Balwin'
        ],
        [
            'Gabriel',
            'Barros',
            '3478486073',
            'mcgabe@gmail.com',
            'xyz'
        ],
        [
            'Mariana',
            'Souza',
            '9478486073',
            'msouza@gmail.com',
            '200 Balwin'
        ],
        [
            'Mariana',
            'Souza',
            '9478486073',
            'msouza@gmail.com',
            '200 Balwin'
        ],
        [
            'Gabriel',
            'Barros',
            '3478486073',
            'mcgabe@gmail.com',
            'xyz'
        ],
        [
            'Mariana',
            'Souza',
            '9478486073',
            'msouza@gmail.com',
            '200 Balwin'
        ],
        [
            'Gabriel',
            'Barros',
            '3478486073',
            'mcgabe@gmail.com',
            'xyz'
        ],
        [
            'Mariana',
            'Souza',
            '9478486073',
            'msouza@gmail.com',
            '200 Balwin'
        ],

    ]);

    const onRowClick = () => {

        history.push("/admin");
    }

    const options = {
        responsive: 'standard',
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
                    data={data}
                    columns={columns}
                    options={options}
                />
            </Container>

        </>
    )

}

export default Clients;













