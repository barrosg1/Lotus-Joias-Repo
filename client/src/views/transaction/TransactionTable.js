import {

    Button,
    Container, Media,

} from "reactstrap";

import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types'

import GeneralHeader from '../../components/Headers/GeneralHeader';

import { getProducts } from '../../redux/actions/productActions';
import { useSelector } from "react-redux";


const TransactionTable = ({ getProducts, history }) => {

    const products = useSelector(state => state.productReducer.products);
    const loading = useSelector(state => state.productReducer.loading);

    useEffect(() => {

        getProducts();

    }, [getProducts, loading]);


    const goToTransactionPage = (id) => { history.push(`/admin/edit-product/${id}`); }

    const columns = [
        {
            name: 'View Product',
            options: {
                customBodyRender: (value) => {

                    return (
                        <Button onClick={() => goToTransactionPage(value)} color="secondary" className>View</Button>
                    );
                },
                filter: false
            }

        },

        {
            name: 'Category',
            options: {
                filter: true
            }
        },
        {
            name: 'Product Name',
            options: {
                filter: false
            }
        },

    ];

    const constructedData = () => {
        const productList = [];

        !loading && products && products.forEach(product => {

            productList.unshift({
                "Category": product.category,
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

    const options = {
        responsive: 'responsive',
        selectableRows: false,
        fixedHeader: true,
        fixedSelectColumn: true,
        tableBodyHeight: '700px',
        rowsPerPageOptions: [5, 10, 25],

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

TransactionTable.propTypes = {
    getProducts: PropTypes.func.isRequired,
    getProductById: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({

    productInfo: state.productReducer

});


export default connect(mapStateToProps, { getProducts })(TransactionTable);













