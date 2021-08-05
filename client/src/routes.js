
const routes = [
  {
    path: "",
    name: "Painel",
    icon: "ni ni-tv-2 text-primary",
    layout: "/admin",
  },
  {

    name: "Clientes",
    icon: "ni ni-tv-2 text-primary",
    sub: [{
      path: "/clients",
      name: "View Clients",
      layout: "/admin",
    },
    {
      path: "/add-client",
      name: "New Client",
      layout: "/admin",
    },

    ]
  },
  {

    name: "Produtos",
    icon: "ni ni-tv-2 text-primary",
    sub: [{
      path: "/products",
      name: "Ver Products",
      layout: "/admin",
    },
    {
      path: "/add-product",
      name: "Adicionar Produto",
      layout: "/admin",
    },

    ]
  },

  {
    name: "Categorias",
    icon: "ni ni-bullet-list-67 text-red",
    sub: [{
      path: "/categories",
      name: "Ver Categorias",
      layout: "/admin",
    },
    {
      path: "/add-product",
      name: "Adicionar Categoria",
      layout: "/admin",
    },

    ]
  },
  {
    path: "/add-user",
    name: "Usuários",
    icon: "ni ni-circle-08 text-pink",
    layout: "/admin",
  },
  {
    path: "/wholesalers",
    name: "Fornecedores",
    icon: "ni ni-tv-2 text-primary",
    layout: "/admin",
  },
];

export default routes;
