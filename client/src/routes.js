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
import Maps from "views/examples/Maps.js";
import Users from './views/users/Users';

var routes = [
  {
    path: "",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: AdminView,
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
    name: "Categories",
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
    path: "/add-user",
    name: "Users",
    icon: "ni ni-circle-08 text-pink",
    component: Users,
    layout: "/admin",
  },
];
export default routes;
