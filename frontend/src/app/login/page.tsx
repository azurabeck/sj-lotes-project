/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Depuração: Verificar o status da resposta
      if (response.ok) {
        const data = await response.json();
        
        // Armazenar o token JWT em um cookie
        Cookies.set('token', data.token, { expires: 1, sameSite: 'strict' });

        // Redirecionar o usuário para a página principal
        router.push('/');
      } else {
        // Exibir a resposta completa para depuração
        const errorData = await response.json();
        console.error('Erro no login:', errorData);
        setError('Credenciais inválidas');
      }
    } catch (err) {
      console.error('Erro de conexão:', err);
      setError('Erro ao conectar ao servidor');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Entrar</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
          className="mb-4 w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          className="mb-6 w-full px-4 py-2 border rounded-lg"
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
