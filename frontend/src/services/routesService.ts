export const publicRoutes = [
  "/login",
  "/forgot-password",
];

export const adminRoutes = [
  "/dashboard",
  "/register",
  "/clientes/register",
  // Outras rotas de admin
];

export const clientRoutes = [
  "/lote"
];

export const isAdminRoute = (route: string): boolean => adminRoutes.includes(route);
export const isClientRoute = (route: string): boolean => clientRoutes.includes(route);
