// @components/Modal.tsx
import React, { useState } from 'react';

interface ModalProps {
  onClose: () => void; // Função para fechar o modal
  onSave: (senha: string) => void; // Função para salvar o acesso
  isSaving: boolean; // Estado de carregamento
}

export const Modal: React.FC<ModalProps> = ({ onClose, onSave, isSaving }) => {
  const [senha, setSenha] = useState(''); // Estado para armazenar a senha

  const handleSave = () => {
    onSave(senha); // Chama a função passada via props e envia a senha
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Criar Acesso</h2>
          <button className="text-gray-500" onClick={onClose}>
            X
          </button>
        </div>
        <p className="mb-4">
          Crie uma senha para o usuário ter acesso à documentação, pagamento e dados.
        </p>
        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Digite a senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)} // Atualiza o estado da senha
        />
        <button
          className="bg-[#4CAF50] p-2 w-full rounded-md text-sm font-medium text-white hover:bg-[#43A047]"
          onClick={handleSave}
          disabled={isSaving} // Desabilita o botão enquanto salva
        >
          {isSaving ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </div>
  );
};
