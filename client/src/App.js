/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AuthLayout from "layouts/Auth.js";
import PrivateRoute from "layouts/PrivateRoute";
import Profile from './views/profile/Profile';
import AdminView from './views/AdminView';

// === Products Components ===
import Products from './views/product/Products';
import EditProduct from './views/product/EditProduct';
import AddProduct from './views/product/AddProduct';

// === Clients Components ===
import Clients from './views/client/Clients';
import AddClient from './views/client/AddClient';



function App() {

    const ADMIN = '/admin';
    const AUTH = '/auth';

    return (
        <Router>
            <Switch>
                <Route exact path={`${AUTH}/login`} component={AuthLayout} />
                <PrivateRoute exact path={`${ADMIN}/user-profile`} component={Profile} isAuthenticated={true} />
                <PrivateRoute exact path={`${ADMIN}/clients`} component={Clients} isAuthenticated={true} />
                <PrivateRoute exact path={`${ADMIN}/products`} component={Products} isAuthenticated={true} />
                <PrivateRoute exact path={`${ADMIN}/add-product`} component={AddProduct} isAuthenticated={true} />
                <PrivateRoute exact path={`${ADMIN}/add-client`} component={AddClient} isAuthenticated={true} />
                <PrivateRoute exact path={`${ADMIN}/edit-product`} component={EditProduct} isAuthenticated={true} />
                <PrivateRoute exact path={ADMIN} component={AdminView} isAuthenticated={true} />

                <Redirect from="/" to={ADMIN} />
            </Switch>
        </Router>
    )
}

export default App;