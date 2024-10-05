/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useEffect, useState } from 'react';
import { fetchClienteById, Cliente } from '../../../services/clienteService';
import { Dashboard } from '@components/Dashboard';

interface ClienteDetalhesProps {
  params: { id: string }; // O Next.js passa os parâmetros dinâmicos aqui
}

export default function ClienteDetalhes({ params }: ClienteDetalhesProps) {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      const loadCliente = async () => {
        try {
          const data = await fetchClienteById(Number(params.id)); // Buscar detalhes do cliente pelo ID
          setCliente(data);
        } catch (err) {
          setError('Erro ao buscar detalhes do cliente');
        } finally {
          setLoading(false);
        }
      };

      loadCliente();
    }
  }, [params.id]);

  return (
    <Dashboard>
      {loading && <p>Carregando detalhes do cliente...</p>}
      {error && <p>{error}</p>}
      {cliente && (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">{cliente.name}</h1>
          <p><strong>Email:</strong> {cliente.email}</p>
          <p><strong>CPF:</strong> {cliente.cpf}</p>
          <p><strong>Telefone 1:</strong> {cliente.telefone1}</p>
          <p><strong>Telefone 2:</strong> {cliente.telefone2}</p>
          <p><strong>Número do Lote:</strong> {cliente.numLote}</p>
        </div>
      )}
    </Dashboard>
  );
}
