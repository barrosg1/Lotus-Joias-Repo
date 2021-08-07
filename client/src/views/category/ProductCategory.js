import MUIDataTable from "mui-datatables";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

// reactstrap components
import { Button } from "reactstrap";

import { getProductCategories, deleteProductCategory } from '../../redux/actions/categoryActions';


const ProductCategory = () => {

    const dispatch = useDispatch();

    const productCategories = useSelector(state => state.categoryReducer.productCategories);
    const productLoading = useSelector(state => state.categoryReducer.productLoading);

    useEffect(() => {

        dispatch(getProductCategories());

    }, [dispatch, productLoading]);

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

    const productColumns = [

        {
            name: 'Delete',
            options: {
                customBodyRender: (productId) => {
                    return (
                        <Button
                            onClick={() => dispatch(deleteProductCategory(productId))}
                            size="sm"
                            className="btn-delete"
                        >
                            Delete
                        </Button>
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

export default ProductCategory;













