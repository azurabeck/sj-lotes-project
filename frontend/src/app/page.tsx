'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { isAdminRoute } from '../services/routesService';

export default function Home() {
  const router = useRouter();
  const pathname = usePathname(); 

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      router.replace('/login'); // Se não houver token, redirecionar para a página de login
      return;
    }

    // Verificar o token no backend e redirecionar para a página correta
    const verifyToken = async () => {
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
        console.log('Dados do token verificado:', data);

        if (isAdminRoute(pathname)) {
          if (data.userType !== 'admin') {
            router.replace('/login'); // Redireciona para login se não for admin
          }
        }
        if (data.userType === 'admin') {
          router.replace('/clientes/registrar'); // Redireciona para dashboard se for admin
        } else if (data.userType === 'client') {
          router.replace('/lote'); // Redireciona para lote se for cliente
        } else {
          router.replace('/login'); // Se o tipo não for válido, redireciona para login
        }
      } catch (err) {
        console.error('Erro ao verificar token:', err);
        router.replace('/login'); // Redirecionar para login em caso de erro
      }
    };

    verifyToken();
  }, [router, pathname]); 

  return null;
}
