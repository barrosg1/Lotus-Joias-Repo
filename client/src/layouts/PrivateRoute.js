import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { Container, Spinner } from "reactstrap";
import { useSelector } from 'react-redux';

import Sidebar from '../components/Sidebar/Sidebar';
import AdminNavbar from '../components/Navbars/AdminNavbar';
import GeneralHeader from '../components/Headers/GeneralHeader';
import DashboardHeader from 'components/Headers/DashboardHeader.js';

const PrivateRoute = ({
    component: Component,
    isDashboard,
    ...rest
}) => {

    const { isAuthenticated, loading, currentUser } = useSelector(state => state.authReducer);

    return (
        <Route
            {...rest}
            render={props => !isAuthenticated && !loading ? (<Redirect to="/auth/login" />) : (

                <Fragment>
                    {
                        !currentUser ? (<Spinner color="primary" />)

                            :

                            <Fragment>
                                <Sidebar />
                                <div className="main-content" >
                                    <AdminNavbar />
                                    {
                                        isDashboard ? (
                                            <>
                                                <DashboardHeader />
                                                <Container className="mt--7 p-5" fluid>
                                                    <Component {...props} />
                                                </Container>
                                            </>
                                        )

                                            :

                                            (
                                                <>
                                                    <GeneralHeader />
                                                    <Container className="mb-100">
                                                        <Component {...props} />
                                                    </Container>
                                                </>
                                            )
                                    }
                                </div>
                            </Fragment>
                    }

                </Fragment>

            )}
        />
    );
}


export default PrivateRoute;
