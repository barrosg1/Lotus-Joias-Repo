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

        toggle();
    }

    const productColumns = [

        {
            name: 'Delete',
            options: {
                customBodyRender: (productId, tableMeta, updateValue) => {
                    return (
                        <>
                            <Button onClick={toggle} size="sm" className="btn-delete">Delete</Button>

                            <Modal isOpen={modal} toggle={toggle}>
                                <ModalHeader toggle={toggle}>Are you sure?</ModalHeader>
                                <ModalBody>
                                    Are you sure you want to delete this category?
                                </ModalBody>
                                <ModalFooter>
                                    <Button className="btn-delete" onClick={() => prodCategoryDelete(productId)}>Delete</Button>{' '}
                                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                                </ModalFooter>
                            </Modal>

                        </>

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













