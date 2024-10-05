/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import { fetchClientes, Cliente } from '../../../services/clienteService';
import { Dashboard } from '@components/Dashboard';

export default function ClientList() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Dashboard>
        <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Client List</h1>
        <table className="min-w-full bg-white">
            <thead>
            <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Client Name</th>
                <th className="py-2 px-4 border-b">Contact Phone</th>
                <th className="py-2 px-4 border-b">Lot</th>
            </tr>
            </thead>
            <tbody>
            {clientes.map((cliente) => (
                <tr key={cliente.id}>
                <td className="py-2 px-4 border-b">{cliente.id}</td>
                <td className="py-2 px-4 border-b">{cliente.name}</td>
                <td className="py-2 px-4 border-b">{cliente.telefone1}</td>
                <td className="py-2 px-4 border-b">{cliente.numLote}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </Dashboard>
  );
}
