export const publicRoutes = [
  "/login",
  "/forgot-password",
  "/clientes/registrar", //temp
  "/clientes/lista-de-clientes", //temp
];

export const adminRoutes = [
  "/dashboard",
  "/clientes/registrar",
  "/clientes/lista-de-clientes",

  // Outras rotas de admin
];

export const clientRoutes = [
  "/lote"
];

export const isAdminRoute = (route: string): boolean => adminRoutes.includes(route);
export const isClientRoute = (route: string): boolean => clientRoutes.includes(route);
