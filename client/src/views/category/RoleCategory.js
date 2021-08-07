import MUIDataTable from "mui-datatables";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

// reactstrap components
import { Button } from "reactstrap";

import {
    getRoleCategories,
    deleteRoleCategory
} from '../../redux/actions/categoryActions';


const RoleCategory = () => {

    const dispatch = useDispatch();

    // from state
    const currentUser = useSelector(state => state.authReducer.currentUser);
    const categories = useSelector(state => state.categoryReducer.categories);
    const loading = useSelector(state => state.categoryReducer.loading);

    useEffect(() => {

        dispatch(getRoleCategories());

    }, [dispatch, loading]);


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

    const roleColumns = [
        {
            name: 'Delete',
            options: {
                customBodyRender: (categoryId) => {
                    return (
                        <Button
                            onClick={() => dispatch(deleteRoleCategory(categoryId))}
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

export default RoleCategory;













