import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { isAdminRoute, isClientRoute } from '../services/routesService'; // Funções de verificação de rotas

export const useCheckPermissions = () => {
  const router = useRouter();
  const pathname = usePathname(); // Use o usePathname para obter a rota atual
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    // Função para verificar o token e o tipo de usuário
    const verifyToken = async () => {
      const token = Cookies.get('token');

      if (!token) {
        setUserType('guest'); // Se não houver token, considere como "guest"
        router.replace('/login'); // Redireciona para login se não houver token
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/verify-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Token inválido');
        }

        const data = await response.json();
        setUserType(data.userType); // Define o userType com base no token verificado

        // Verifica se a rota atual é de admin e o usuário não é admin
        if (isAdminRoute(pathname) && data.userType !== 'admin') {
          router.replace('/login'); // Redireciona se não tiver permissão
        }

        // Verifica se a rota atual é de cliente e o usuário não é cliente
        if (isClientRoute(pathname) && data.userType !== 'client') {
          router.replace('/login'); // Redireciona se não tiver permissão
        }

      } catch (error) {
        console.error('Erro ao verificar o token:', error);
        router.replace('/login'); // Redireciona para login em caso de erro
      }
    };

    verifyToken();
  }, [pathname, router]);

  return userType; // Retorna o tipo de usuário se necessário
};
