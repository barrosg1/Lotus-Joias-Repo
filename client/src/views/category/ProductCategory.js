import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from 'react';
import { connect, useSelector } from "react-redux";
import PropTypes from 'prop-types';

// reactstrap components
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,

} from "reactstrap";

import { getProductCategories, deleteProductCategory } from '../../redux/actions/categoryActions';


const ProductCategory = ({ getProductCategories, deleteProductCategory }) => {

    const productCategories = useSelector(state => state.categoryReducer.productCategories);
    const productLoading = useSelector(state => state.categoryReducer.productLoading);

    useEffect(() => {

        getProductCategories();

    }, [getProductCategories, productLoading]);

    // modal
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


    // display all product categories
    const displayProductCategories = () => {
        const clientList = [];

        productCategories && productCategories.forEach(productCategory => {

            clientList.push({
                "Delete": productCategory._id,
                "Category": productCategory.name,

            });
        });

        return clientList;
    }

    // delete a product category
    const prodCategoryDelete = (id) => {
        deleteProductCategory(id);

    }

    const productColumns = [

        {
            name: 'Delete',
            options: {
                customBodyRender: (productId) => {
                    return (

                        <Button onClick={() => prodCategoryDelete(productId)} size="sm" className="btn-delete">Delete</Button>
                    );
                },
                filter: false
            }

        },
        {
            name: 'Category',
            options: {
                filter: false
            }
        },
    ];

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
            title={"Product Categories"}
            data={displayProductCategories()}
            columns={productColumns}
            options={options}
        />
    )

}

ProductCategory.propTypes = {
    getProductCategories: PropTypes.func.isRequired,
    deleteProductCategory: PropTypes.func.isRequired,
    productCategories: PropTypes.object.isRequired,
    loading: PropTypes.object.isRequired,
}

export default connect(null, {
    getProductCategories,
    deleteProductCategory
})(ProductCategory);













