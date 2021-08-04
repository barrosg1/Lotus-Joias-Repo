import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { Container, Spinner } from "reactstrap";
import { useSelector } from 'react-redux';

import Sidebar from '../components/Sidebar/Sidebar';
import AdminNavbar from '../components/Navbars/AdminNavbar';
import AdminFooter from '../components/Footers/AdminFooter';


const PrivateRoute = ({
    component: Component,
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
                                    <Component {...props} />
                                    <Container fluid>
                                        <AdminFooter />
                                    </Container>
                                </div>
                            </Fragment>
                    }

                </Fragment>

            )}
        />
    );
}


export default PrivateRoute;
