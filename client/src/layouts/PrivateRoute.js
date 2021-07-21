import React, { Fragment, useRef, useEffect } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { Container } from "reactstrap";
import routes from '../routes';
import Sidebar from '../components/Sidebar/Sidebar';
import AdminNavbar from '../components/Navbars/AdminNavbar';
import AdminFooter from '../components/Footers/AdminFooter';

const PrivateRoute = ({
    component: Component,
    isAuthenticated,
    loading,
    ...rest
}) => {

    const mainContent = useRef(null);
    const location = useLocation();

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    }, [location]);

    return (
        <Route
            {...rest}
            render={props =>
                !isAuthenticated && !loading ? (<Redirect to="/auth/login" />) : (

                    <Fragment>
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
                            <div className="main-content" ref={mainContent}>
                                <AdminNavbar />
                                <Component {...props} />
                                <Container fluid>
                                    <AdminFooter />
                                </Container>
                            </div>
                        </>

                    </Fragment>
                )}
        />
    );
}

export default PrivateRoute;
