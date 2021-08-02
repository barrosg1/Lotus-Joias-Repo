import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";


import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import store from "redux/store";

// === Layout Components ===
import AuthLayout from "layouts/Auth.js";
import PrivateRoute from "layouts/PrivateRoute";
import AdminView from './views/AdminView';

// === Profile Component ===
import Profile from './views/profile/Profile';

// === Product Components ===
import Products from './views/product/Products';
import EditProduct from './views/product/EditProduct';
import AddProduct from './views/product/AddProduct';
import Categories from './views/category/Categories';


// === Client Components ===
import Clients from './views/client/Clients';
import AddClient from './views/client/AddClient';

// === Other Imports ===
import { Provider } from 'react-redux';
import { loadUser } from './redux/actions/authActions';
import ClientProfile from './views/client/ClientProfile';



function App() {

    useEffect(() => {

        store.dispatch(loadUser());


    }, []);

    const ADMIN = '/admin';
    const AUTH = '/auth';

    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path={`${AUTH}/login`} component={AuthLayout} />
                    <PrivateRoute path={`${ADMIN}/user-profile`} component={Profile} />
                    <PrivateRoute path={`${ADMIN}/clients`} component={Clients} />
                    <PrivateRoute path={`${ADMIN}/categories`} component={Categories} />
                    <PrivateRoute path={`${ADMIN}/products`} component={Products} />
                    <PrivateRoute path={`${ADMIN}/add-product`} component={AddProduct} />
                    <PrivateRoute path={`${ADMIN}/add-client`} component={AddClient} />
                    <PrivateRoute path={`${ADMIN}/edit-product/:product_id`} component={EditProduct} />
                    <PrivateRoute path={`${ADMIN}/client-profile/:client_id`} component={ClientProfile} />
                    <PrivateRoute path={ADMIN} component={AdminView} />

                    <Redirect from="/" to={ADMIN} />
                </Switch>
            </Router>
        </Provider>
    )
}

export default App;