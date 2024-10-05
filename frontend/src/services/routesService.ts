export const publicRoutes = [
  "/login",
  "/forgot-password",
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
