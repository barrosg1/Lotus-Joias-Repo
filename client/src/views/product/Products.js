import {

    Button,
    Container, Media,

} from "reactstrap";

import MUIDataTable from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types'

import GeneralHeader from '../../components/Headers/GeneralHeader';

import { getProducts } from '../../redux/actions/productActions';
import { useSelector } from "react-redux";


const Products = ({ getProducts, productInfo: { products, loading } }) => {

    // let products = useSelector(state => state.productReducer.products);

    // const [data, setData] = useState([]);

    useEffect(() => {

        getProducts();

    }, [getProducts]);


    const editProduct = (id) => { alert(id); }

    const [columns, setColumns] = useState([
        {
            name: 'View Product',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Button onClick={() => editProduct(value)} color="secondary" className>Edit</Button>
                    );
                },
                filter: false
            }

        },
        {
            name: 'Product Image',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {

                    return (
                        <Media
                            className="product-image-table"
                            src={`/images/${value}`}
                            alt="..."
                        />
                    );
                },
                filter: false
            }

        },
        {
            name: 'Product Name',
            options: {
                filter: false
            }
        },
        {
            name: 'Wholesale Price',
            options: {
                filter: false
            }
        },
        {
            name: 'Retail Price',
            options: {
                filter: false
            }
        },
        {
            name: 'Bought From',

        },
        {
            name: 'Description',
            options: {
                filter: false
            }
        }
    ]);

    const constructedData = () => {
        const productList = [];

        !loading && products && products.forEach(product => {

            productList.push({
                "View Product": product._id,
                "Product Image": product.image,
                "Product Name": product.name,
                "Wholesale Price": product.wholesalePrice,
                "Bought From": product.wholesaler,
                "Retail Price": product.retailPrice,
                "Description": product.description
            });
        });

        return productList;
    }


    // // const onRowClick = () => {

    // //     history.push("/admin");
    // // }


    const options = {
        responsive: 'vertical',
        selectableRows: false,
        fixedHeader: true,
        fixedSelectColumn: true,
        tableBodyHeight: '700px',
        // onRowClick,
        rowsPerPageOptions: [5, 10, 25]

    };

    return (
        <>

            <GeneralHeader />

            <Container>

                <MUIDataTable
                    title={"Products"}
                    data={constructedData()}
                    columns={columns}
                    options={options}
                />


            </Container>

        </>
    )

}

Products.propTypes = {
    getProducts: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({

    productInfo: state.productReducer

});


export default connect(mapStateToProps, { getProducts })(Products);













