/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchClienteById, Cliente, registerClienteAcess } from '../../../services/clienteService';
import { Dashboard } from '@components/Dashboard';
import { Modal } from '@components/Modal';

interface ClienteDetalhesProps {
  params: { id: string };
}

export default function ClienteDetalhes({ params }: ClienteDetalhesProps) {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal
  const [isSaving, setIsSaving] = useState(false); // Estado de salvamento
  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      const loadCliente = async () => {
        try {
          const data = await fetchClienteById(Number(params.id));
          console.log(data);
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

  const handleEditClient = () => {
    router.push(`/clientes/edit/${params.id}`);
  };

  const handleCreateAccess = () => {
    setIsModalOpen(true); // Abre o modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Fecha o modal
  };

  const handleSaveAccess = async (senha: string) => {
    if (cliente && senha) {
      setIsSaving(true); // Define o estado de salvamento como verdadeiro
  
      try {
        const clienteData = {
          id: cliente.user_id, // O user_id está sendo mapeado corretamente
          email: cliente.email,
          senha: senha,
          type: 'client'
        };
  
        // Chama a função para registrar o cliente no backend
        await registerClienteAcess(clienteData);
  
        console.log('Acesso criado com sucesso!');
        setIsModalOpen(false); // Fecha o modal após salvar com sucesso
      } catch (error) {
        console.error('Erro ao criar o acesso do cliente:', error);
        alert('Erro ao criar o acesso, tente novamente mais tarde.');
      } finally {
        setIsSaving(false); // Define o estado de salvamento como falso
      }
    } else {
      alert('Por favor, preencha a senha.');
    }
  };

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

          <button
            className="bg-[#FF9800] p-1.5 px-2 rounded-md text-sm font-medium text-white shadow-md shadow-[#9d9d9d] hover:bg-[#FB8C00] cursor-pointer mt-4 mr-2"
            onClick={handleEditClient}
          >
            Editar
          </button>

          <button
            className="bg-[#4CAF50] p-1.5 px-2 rounded-md text-sm font-medium text-white shadow-md shadow-[#9d9d9d] hover:bg-[#43A047] cursor-pointer mt-4"
            onClick={handleCreateAccess}
          >
            Criar Acesso
          </button>

          {/* Modal para Criar Acesso */}
          {isModalOpen && (
            <Modal 
              onClose={handleCloseModal} 
              onSave={handleSaveAccess} 
              isSaving={isSaving} 
            />
          )}
        </div>
      )}
    </Dashboard>
  );
}
