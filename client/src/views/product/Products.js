import {
    Button,
    Container,
    Media,
} from "reactstrap";

import MUIDataTable from "mui-datatables";
import React, { useEffect } from 'react';
import { getProducts } from '../../redux/actions/productActions';
import { useSelector, useDispatch } from "react-redux";

import GeneralHeader from '../../components/Headers/GeneralHeader';


const Products = ({ history }) => {

    const dispatch = useDispatch();

    const products = useSelector(state => state.productReducer.products);
    const loading = useSelector(state => state.productReducer.loading);

    useEffect(() => {

        dispatch(getProducts());

    }, [dispatch, loading]);


    const gotToProductPage = (id) => { history.push(`/admin/edit-product/${id}`); }

    const columns = [
        {
            name: 'View Product',
            options: {
                customBodyRender: (productId) => {

                    return (
                        <Button
                            onClick={() => gotToProductPage(productId)}
                            color="secondary"
                            className
                        >View
                        </Button>
                    );
                },
                filter: false
            }

        },
        {
            name: 'Product Image',
            options: {
                customBodyRender: (value) => {
                    return (
                        <Media
                            className="product-image-table"
                            src={
                                !value ?
                                    require('../../assets/img/random/blank-image.png').default
                                    :
                                    `http://localhost:5000${value}`
                            }
                            alt="..."
                        />
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
        <MUIDataTable
            title={"Products"}
            data={constructedData()}
            columns={columns}
            options={options}
        />
    )

}

export default Products;













