'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      // Se não houver token, redirecionar para a página de login
      router.push('/login');
      return;
    }

    // Verificar o token no backend e redirecionar para a página correta
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/verify-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.userType === 'admin') {
          router.push('/dashboard'); // Redireciona para dashboard se for admin
        } else if (data.userType === 'client') {
          router.push('/lote'); // Redireciona para lote se for client
        } else {
          router.push('/login'); // Se o tipo não for válido, redireciona para login
        }
      })
      .catch((err) => {
        console.error('Erro ao verificar token:', err);
        router.push('/login'); // Redirecionar para login em caso de erro
      });
  }, [router]);

  return null; // Não renderiza nada, pois estamos apenas redirecionando
}
