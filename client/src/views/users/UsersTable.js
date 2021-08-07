import MUIDataTable from "mui-datatables";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { getAllUsers, deleteUser } from '../../redux/actions/userActions';

import { Button } from "reactstrap";


const UsersTable = () => {

    const dispatch = useDispatch();

    // from state
    const currentUser = useSelector(state => state.authReducer.currentUser);
    const users = useSelector(state => state.userReducer.users);
    const loading = useSelector(state => state.userReducer.loading);

    useEffect(() => {

        dispatch(getAllUsers());

    }, [dispatch, loading]);

    const columns = [
        {
            name: 'Delete',
            options: {
                customBodyRender: (userId) => {
                    return (
                        <>
                            {
                                currentUser._id !== userId ?

                                    (
                                        <Button
                                            onClick={() => dispatch(deleteUser(userId))}
                                            size="sm"
                                            className="btn-delete"
                                        >Delete
                                        </Button>
                                    )

                                    :

                                    (
                                        <FontAwesomeIcon
                                            style={{ marginLeft: 22 }}
                                            className="mr-2 text-muted"
                                            icon={faBan}
                                        />
                                    )
                            }

                        </>

                    );
                },
                filter: false
            }
        },
        {
            name: 'Role',
            options: {
                filter: false
            }
        },
        {
            name: 'First Name',
            options: {
                filter: false
            }
        },
        {
            name: 'Last Name',
            options: {
                filter: false
            }
        },
        {
            name: 'Email',
            options: {
                filter: false
            }
        },
        {
            name: 'Temporary Password',
            options: {
                filter: false
            }
        }
    ];

    const displayUsers = () => {
        const clientList = [];

        users && users.forEach(user => {
            clientList.push({
                "Delete": user._id,
                "Role": user.role,
                "First Name": user.firstName,
                "Last Name": user.lastName,
                "Email": user.email,
                "Temporary Password": user.tempPassword,

            });
        });

        return clientList;
    }

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
            title={"Users"}
            data={displayUsers()}
            columns={columns}
            options={options}
        />
    )
}

export default UsersTable;













