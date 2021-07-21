import MUIDataTable from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import React, { useState } from 'react';
import { Redirect, useHistory } from "react-router-dom";

// reactstrap components
import {

    Button,
    Container, Media,

} from "reactstrap";

import GeneralHeader from '../../components/Headers/GeneralHeader';

const Products = () => {

    let history = useHistory();

    const editProduct = (id) => {

        alert(id);
    }


    const [columns, setColumns] = useState([
        {
            name: 'View Product',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Button onClick={() => editProduct(value)} color="secondary" className>Edit</Button>
                    );
                }
            }

        },
        {
            name: 'Product Image',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Media
                            className="product-image-table"
                            src={value}
                            alt="..."
                        />
                    );
                }
            }

        },
        {
            name: 'Product Name'
        },
        {
            name: 'Wholesale Price'
        },
        {
            name: 'Retail Price'
        },
        {
            name: 'Bought From'
        },
        {
            name: 'Description'
        }
    ]);

    const [data, setData] = useState([

        {
            "View Product": "abc123",
            "Product Image": "https://image.shutterstock.com/image-illustration/3d-render-golden-rings-isolated-260nw-172133633.jpg",
            "Product Name": "Berloque",
            "Wholesale Price": "2.99",
            "Bought From": "Marisa US",
            "Retail Price": "10.99",
            "Description": "Nice!"
        },
        {
            "View Product": "abc123",
            "Product Image": "https://www.brides.com/thmb/4PCnLR-h1HZuGHEP0AFkF0o8EiM=/1190x1190/smart/filters:no_upscale()/sq-b609e1c6078c460abc25857ae151bf2e.jpg",
            "Product Name": "Berloque",
            "Wholesale Price": "2.99",
            "Bought From": "Marisa US",
            "Retail Price": "10.99",
            "Description": "Nice!"
        },
        {
            "View Product": "abc123",
            "Product Image": "https://media.tiffany.com/is/image/Tiffany/EcomItemL2/tiffany-hardwearlink-bracelet-38086839_993599_ED_M.jpg",
            "Product Name": "Berloque",
            "Wholesale Price": "2.99",
            "Bought From": "Marisa US",
            "Retail Price": "10.99",
            "Description": "Nice!"
        },
        {
            "View Product": "abc123",
            "Product Image": "https://image.shutterstock.com/image-illustration/3d-render-golden-rings-isolated-260nw-172133633.jpg",
            "Product Name": "Berloque",
            "Wholesale Price": "2.99",
            "Bought From": "Marisa US",
            "Retail Price": "10.99",
            "Description": "Nice!"
        },
        {
            "View Product": "abc123",
            "Product Image": "https://www.brides.com/thmb/4PCnLR-h1HZuGHEP0AFkF0o8EiM=/1190x1190/smart/filters:no_upscale()/sq-b609e1c6078c460abc25857ae151bf2e.jpg",
            "Product Name": "Berloque",
            "Wholesale Price": "2.99",
            "Bought From": "Marisa US",
            "Retail Price": "10.99",
            "Description": "Nice!"
        },
        {
            "View Product": "abc123",
            "Product Image": "https://media.tiffany.com/is/image/Tiffany/EcomItemL2/tiffany-hardwearlink-bracelet-38086839_993599_ED_M.jpg",
            "Product Name": "Berloque",
            "Wholesale Price": "2.99",
            "Bought From": "Marisa US",
            "Retail Price": "10.99",
            "Description": "Nice!"
        },
        {
            "View Product": "abc123",
            "Product Image": "https://image.shutterstock.com/image-illustration/3d-render-golden-rings-isolated-260nw-172133633.jpg",
            "Product Name": "Berloque",
            "Wholesale Price": "2.99",
            "Bought From": "Marisa US",
            "Retail Price": "10.99",
            "Description": "Nice!"
        },
        {
            "View Product": "abc123",
            "Product Image": "https://www.brides.com/thmb/4PCnLR-h1HZuGHEP0AFkF0o8EiM=/1190x1190/smart/filters:no_upscale()/sq-b609e1c6078c460abc25857ae151bf2e.jpg",
            "Product Name": "Berloque",
            "Wholesale Price": "2.99",
            "Bought From": "Marisa US",
            "Retail Price": "10.99",
            "Description": "Nice!"
        },
        {
            "View Product": "abc123",
            "Product Image": "https://media.tiffany.com/is/image/Tiffany/EcomItemL2/tiffany-hardwearlink-bracelet-38086839_993599_ED_M.jpg",
            "Product Name": "Berloque",
            "Wholesale Price": "2.99",
            "Bought From": "Marisa US",
            "Retail Price": "10.99",
            "Description": "Nice!"
        },
        {
            "View Product": "abc123",
            "Product Image": "https://image.shutterstock.com/image-illustration/3d-render-golden-rings-isolated-260nw-172133633.jpg",
            "Product Name": "Berloque",
            "Wholesale Price": "2.99",
            "Bought From": "Marisa US",
            "Retail Price": "10.99",
            "Description": "Nice!"
        },
        {
            "View Product": "abc123",
            "Product Image": "https://www.brides.com/thmb/4PCnLR-h1HZuGHEP0AFkF0o8EiM=/1190x1190/smart/filters:no_upscale()/sq-b609e1c6078c460abc25857ae151bf2e.jpg",
            "Product Name": "Berloque",
            "Wholesale Price": "2.99",
            "Bought From": "Marisa US",
            "Retail Price": "10.99",
            "Description": "Nice!"
        },
        {
            "View Product": "abc123",
            "Product Image": "https://media.tiffany.com/is/image/Tiffany/EcomItemL2/tiffany-hardwearlink-bracelet-38086839_993599_ED_M.jpg",
            "Product Name": "Berloque",
            "Wholesale Price": "2.99",
            "Bought From": "Marisa US",
            "Retail Price": "10.99",
            "Description": "Nice!"
        },
        {
            "View Product": "abc123",
            "Product Image": "https://image.shutterstock.com/image-illustration/3d-render-golden-rings-isolated-260nw-172133633.jpg",
            "Product Name": "Berloque",
            "Wholesale Price": "2.99",
            "Bought From": "Marisa US",
            "Retail Price": "10.99",
            "Description": "Nice!"
        },
        {
            "View Product": "abc123",
            "Product Image": "https://www.brides.com/thmb/4PCnLR-h1HZuGHEP0AFkF0o8EiM=/1190x1190/smart/filters:no_upscale()/sq-b609e1c6078c460abc25857ae151bf2e.jpg",
            "Product Name": "Berloque",
            "Wholesale Price": "2.99",
            "Bought From": "Marisa US",
            "Retail Price": "10.99",
            "Description": "Nice!"
        },
        {
            "View Product": "abc123",
            "Product Image": "https://media.tiffany.com/is/image/Tiffany/EcomItemL2/tiffany-hardwearlink-bracelet-38086839_993599_ED_M.jpg",
            "Product Name": "Berloque",
            "Wholesale Price": "2.99",
            "Bought From": "Marisa US",
            "Retail Price": "10.99",
            "Description": "Nice!"
        },
        {
            "View Product": "abc123",
            "Product Image": "https://image.shutterstock.com/image-illustration/3d-render-golden-rings-isolated-260nw-172133633.jpg",
            "Product Name": "Berloque",
            "Wholesale Price": "2.99",
            "Bought From": "Marisa US",
            "Retail Price": "10.99",
            "Description": "Nice!"
        },
        {
            "View Product": "abc123",
            "Product Image": "https://www.brides.com/thmb/4PCnLR-h1HZuGHEP0AFkF0o8EiM=/1190x1190/smart/filters:no_upscale()/sq-b609e1c6078c460abc25857ae151bf2e.jpg",
            "Product Name": "Berloque",
            "Wholesale Price": "2.99",
            "Bought From": "Marisa US",
            "Retail Price": "10.99",
            "Description": "Nice!"
        },
        {
            "View Product": "abc123",
            "Product Image": "https://media.tiffany.com/is/image/Tiffany/EcomItemL2/tiffany-hardwearlink-bracelet-38086839_993599_ED_M.jpg",
            "Product Name": "Berloque",
            "Wholesale Price": "2.99",
            "Bought From": "Marisa US",
            "Retail Price": "10.99",
            "Description": "Nice!"
        },

    ]);

    // const onRowClick = () => {

    //     history.push("/admin");
    // }


    const options = {
        responsive: 'standard',
        selectableRows: false,
        // onRowClick,
        rowsPerPageOptions: [5, 10, 25]

    };


    return (
        <>

            <GeneralHeader />
            <Container>
                <MUIDataTable
                    title={"Products"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </Container>

        </>
    )

}

export default Products;













