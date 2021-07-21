import React, { Fragment, useRef, useEffect } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { Container } from "reactstrap";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import routes from '../routes';
import Sidebar from '../components/Sidebar/Sidebar';
import AdminNavbar from '../components/Navbars/AdminNavbar';
import AdminFooter from '../components/Footers/AdminFooter';

const PrivateRoute = ({
    component: Component,
    auth: { isAuthenticated, loading },
    ...rest
}) => {

    return (
        <Route
            {...rest}
            render={props =>
                !isAuthenticated && !loading ? (<Redirect to="/auth/login" />) : (
                    <>
                        <Sidebar
                            {...props}
                            routes={routes}
                            logo={{
                                innerLink: "/admin",
                                imgSrc: require("../assets/img/brand/Logo-02.png").default,
                                imgAlt: "...",
                            }}
                        />
                        <div className="main-content" >
                            <AdminNavbar />
                            <Component {...props} />
                            <Container fluid>
                                <AdminFooter />
                            </Container>
                        </div>

                    </>

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
