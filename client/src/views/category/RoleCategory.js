import MUIDataTable from "mui-datatables";
import React, { useEffect } from 'react';
import { connect, useSelector } from "react-redux";
import PropTypes from 'prop-types';

// reactstrap components
import { Button } from "reactstrap";

import {
    getRoleCategories,
    deleteRoleCategory,
    addRoleCategory,
} from '../../redux/actions/categoryActions';


const RoleCategory = ({
    getRoleCategories,
    deleteRoleCategory,

}) => {

    // from state
    const currentUser = useSelector(state => state.authReducer.currentUser);
    const categories = useSelector(state => state.categoryReducer.categories);
    const loading = useSelector(state => state.categoryReducer.loading);

    useEffect(() => {

        getRoleCategories();

    }, [getRoleCategories, loading]);


    // display category data
    const displayRoleCategories = () => {
        const clientList = [];

        categories && categories.forEach(category => {

            clientList.push({
                "Delete": category._id,
                "Category": category.name,

            });
        });

        return clientList;
    }

    // delete a category
    const roleCategoryDelete = (id) => deleteRoleCategory(id);


    const roleColumns = [

        {
            name: 'Delete',
            options: {
                customBodyRender: (categoryId) => {

                    return (
                        <Button onClick={() => roleCategoryDelete(categoryId)} size="sm" className="btn-delete">Delete</Button>

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
        <>

            {
                !loading && currentUser.role === 'Super Admin' && (
                    <MUIDataTable
                        title={"Role Categories"}
                        data={displayRoleCategories()}
                        columns={roleColumns}
                        options={options}
                    />
                )
            }

        </>
    )

}

RoleCategory.propTypes = {
    getRoleCategories: PropTypes.func.isRequired,
    deleteRoleCategory: PropTypes.func.isRequired,
    categories: PropTypes.object.isRequired,
    loading: PropTypes.object.isRequired,
}

export default connect(null, {
    getRoleCategories,
    deleteRoleCategory,
    addRoleCategory,

})(RoleCategory);













