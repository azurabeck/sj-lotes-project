/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Importar o useRouter para navegação
import { fetchClientes, Cliente } from '../../../services/clienteService';
import { Dashboard } from '@components/Dashboard';

export default function ClientList() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Inicializar o hook useRouter

  useEffect(() => {
    // Usar o serviço para buscar os dados dos clientes
    const loadClientes = async () => {
      try {
        const data = await fetchClientes(); // Chama o serviço
        setClientes(data);
      } catch (err) {
        setError('Erro ao buscar clientes');
      } finally {
        setLoading(false);
      }
    };

    loadClientes();
  }, []);

  const handleViewDetails = (id: number) => {
    // Navegar para a página de detalhes do cliente, passando o ID na URL
    router.push(`/clientes/${id}`);
  };

  return (
    <Dashboard>
      {loading && <p>loading animation...</p>}
      {error && <p>Ops! Um erro aconteceu, tente mais tarde</p>}

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Client List</h1>
        <table className="min-w-full bg-white justify-between text-left">
          <thead>
            <tr>
              <th className="w-[50%] py-2 px-4 border-b">Cliente</th>
              <th className="w-[15%] py-2 px-4 border-b">Telefone</th>
              <th className="w-[15%] py-2 px-4 border-b">Lote</th>
              <th className="w-[20%] py-2 px-4 border-b text-center"></th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td className="w-[50%] py-2 px-4 border-b">{cliente.name}</td>
                <td className="w-[15%] py-2 px-4 border-b">{cliente.telefone1}</td>
                <td className="w-[15%] py-2 px-4 border-b">{cliente.numlote}</td>
                <td className="w-[20%] py-2 px-4 border-b text-right">
                  <button
                    className="bg-[#03A9F4] p-1.5 px-2 rounded-md text-sm font-medium text-white shadow-md shadow-[#9d9d9d] hover:bg-[#039BE5] cursor-pointer"
                    onClick={() => handleViewDetails(1)} // Chama a função para redirecionar
                  >
                    ver mais
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Dashboard>
  );
}
