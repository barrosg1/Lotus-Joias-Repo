import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Sidebar from '../components/Sidebar/Sidebar';
import AdminNavbar from '../components/Navbars/AdminNavbar';
import AdminFooter from '../components/Footers/AdminFooter';

const PrivateRoute = ({
    component: Component,
    auth: { isAuthenticated, loading, user },
    ...rest
}) => {

    return (
        <Route
            {...rest}
            render={props => !isAuthenticated && !loading ? (<Redirect to="/auth/login" />) : (

                <Fragment>
                    {
                        !user ? (<p>Loading...</p>)

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

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.authReducer
});

export default connect(mapStateToProps)(PrivateRoute);
