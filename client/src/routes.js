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
import AdminView from "views/AdminView.js";
import Profile from "views/profile/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/login/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";

var routes = [
  {
    path: "",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: AdminView,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
  },
  {

    name: "Clients",
    icon: "ni ni-tv-2 text-primary",
    sub: [{
      path: "/clients",
      name: "View Clients",
      component: Maps,
      layout: "/admin",
    },
    {
      path: "/add-client",
      name: "New Client",
      component: Maps,
      layout: "/admin",
    },

    ]
  },
  {

    name: "Products",
    icon: "ni ni-tv-2 text-primary",
    sub: [{
      path: "/products",
      name: "View Products",
      component: Maps,
      layout: "/admin",
    },
    {
      path: "/add-product",
      name: "New Product",
      component: Maps,
      layout: "/admin",
    },

    ]
  },

  {
    name: "Manage",
    icon: "ni ni-bullet-list-67 text-red",
    sub: [{
      path: "/categories",
      name: "View Categories",
      component: Maps,
      layout: "/admin",
    },
    {
      path: "/add-product",
      name: "New Category",
      component: Maps,
      layout: "/admin",
    },

    ]
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
];
export default routes;
