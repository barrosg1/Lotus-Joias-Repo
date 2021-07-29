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
    const user = useSelector(state => state.authReducer.user);
    const categories = useSelector(state => state.categoryReducer.categories);
    const loading = useSelector(state => state.categoryReducer.loading);

    useEffect(() => {

        getRoleCategories();

    }, [getRoleCategories]);

    // modal
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

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
    const roleCategoryDelete = (id) => {
        deleteRoleCategory(id);

        toggle();
    }

    const roleColumns = [

        {
            name: 'Delete',
            options: {
                customBodyRender: (categoryId, tableMeta, updateValue) => {

                    return (
                        <>
                            <Button onClick={toggle} size="sm" className="btn-delete">Delete</Button>

                            <Modal isOpen={modal} toggle={toggle}>
                                <ModalHeader toggle={toggle}>Are you sure?</ModalHeader>
                                <ModalBody>
                                    Are you sure you want to delete this category?
                                </ModalBody>
                                <ModalFooter>
                                    <Button className="btn-delete" onClick={() => roleCategoryDelete(categoryId)}>Delete</Button>{' '}
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
        <>

            {
                !loading && user.role === 'Super Admin' && (
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













