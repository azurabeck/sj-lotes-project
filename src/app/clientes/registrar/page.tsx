'use client'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Biblioteca para gerar UUID
import { Dashboard } from '@components/Dashboard';
import { registerCliente } from '../../../services/clienteService'; // Importa a função de registro

export default function Register() {
  // Gerar um UUID como user_id
  const [userId] = useState(uuidv4()); // Gera o user_id na primeira renderização
  const [name, setName] = useState('Usuário Teste');
  const [email, setEmail] = useState('teste@teste.com');
  const [cpf, setCpf] = useState('123.456.789-00');
  const [rg, setRg] = useState('12345678');
  const [dataExp, setValidade] = useState('2025-12-31');
  const [orgaoExp, setOrgaoExpeditor] = useState('SSP');
  const [telefone1, setTelefone1] = useState('11 99999-9999');
  const [telefone2, setTelefone2] = useState('11 98888-8888');
  const [dataNasc, setDataNasc] = useState('1990-01-01');
  const [numLote, setNumLote] = useState('Lote 001');
  const [dataCompra, setDataCompra] = useState('2024-01-01');
  const [dataPrevista, setDataPrevista] = useState('2024-12-31');
  const [valorLote, setValorLote] = useState('100000.00');
  const [valorEntrada, setValorEntrada] = useState('20000.00');
  const [formaPagamento, setFormaPagamento] = useState('parcelado');
  const [valorParcelas, setValorParcelas] = useState('2000.00');
  const [error, setError] = useState('');
  
  const cleanInput = (input: string) => {
    // Remover . e - de strings
    return input.replace(/[.\-]/g, '');
  };


  const handleRegister = async () => {
    const cleanedCpf = cleanInput(cpf);
    const cleanedRg = cleanInput(rg);
    const cleanedTelefone1 = cleanInput(telefone1);
    const cleanedTelefone2 = cleanInput(telefone2);

    console.log('id:', userId)
    const clienteData = {
      user_id: userId, 
      name,
      email,
      cpf: cleanedCpf,
      rg: cleanedRg,
      dataExp,
      orgaoExp,
      telefone1: cleanedTelefone1,
      telefone2: cleanedTelefone2,
      dataNasc,
      numLote,
      dataCompra,
      dataPrevista,
      valorLote,
      valorEntrada,
      formaPagamento,
      valorParcelas,
    };

    try {
      await registerCliente(clienteData); // Utiliza a função do serviço
      alert('Usuário criado com sucesso!');
    } catch (err) {
      console.error('Erro ao conectar ao servidor:', err);
      setError('Erro ao conectar ao servidor');
    }
  };

  return (
    <Dashboard>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Cadastro de Usuário</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Informações do Comprador */}
          <h3 className="font-bold mb-4">Informações do Comprador</h3>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome completo" className="mb-4 w-full px-4 py-2 border rounded-lg" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="mb-4 w-full px-4 py-2 border rounded-lg" />
          <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="CPF" className="mb-4 w-full px-4 py-2 border rounded-lg" />
          <input type="text" value={rg} onChange={(e) => setRg(e.target.value)} placeholder="RG" className="mb-4 w-full px-4 py-2 border rounded-lg" />
          <input type="text" value={dataExp} onChange={(e) => setValidade(e.target.value)} placeholder="Validade do RG" className="mb-4 w-full px-4 py-2 border rounded-lg" />
          <input type="text" value={orgaoExp} onChange={(e) => setOrgaoExpeditor(e.target.value)} placeholder="Orgão Expeditor" className="mb-4 w-full px-4 py-2 border rounded-lg" />
          <input type="text" value={telefone1} onChange={(e) => setTelefone1(e.target.value)} placeholder="Telefone 1" className="mb-4 w-full px-4 py-2 border rounded-lg" />
          <input type="text" value={telefone2} onChange={(e) => setTelefone2(e.target.value)} placeholder="Telefone 2" className="mb-4 w-full px-4 py-2 border rounded-lg" />
          <input type="date" value={dataNasc} onChange={(e) => setDataNasc(e.target.value)} placeholder="Data de Nascimento" className="mb-4 w-full px-4 py-2 border rounded-lg" />

          {/* Informações da Compra */}
          <h3 className="font-bold mb-4">Informações da Compra</h3>
          <input type="text" value={numLote} onChange={(e) => setNumLote(e.target.value)} placeholder="Número do Lote" className="mb-4 w-full px-4 py-2 border rounded-lg" />
          <input type="date" value={dataCompra} onChange={(e) => setDataCompra(e.target.value)} placeholder="Data da Compra" className="mb-4 w-full px-4 py-2 border rounded-lg" />
          <input type="date" value={dataPrevista} onChange={(e) => setDataPrevista(e.target.value)} placeholder="Data Prevista de Conclusão" className="mb-4 w-full px-4 py-2 border rounded-lg" />
          <input type="text" value={valorLote} onChange={(e) => setValorLote(e.target.value)} placeholder="Valor do Lote" className="mb-4 w-full px-4 py-2 border rounded-lg" />
          <input type="text" value={valorEntrada} onChange={(e) => setValorEntrada(e.target.value)} placeholder="Valor Pago na Entrada" className="mb-4 w-full px-4 py-2 border rounded-lg" />

          <select value={formaPagamento} onChange={(e) => setFormaPagamento(e.target.value)} className="mb-4 w-full px-4 py-2 border rounded-lg">
            <option value="avista">À Vista</option>
            <option value="parcelado">Parcelado</option>
          </select>

          {formaPagamento === 'parcelado' && (
            <input type="text" value={valorParcelas} onChange={(e) => setValorParcelas(e.target.value)} placeholder="Valor das Parcelas" className="mb-4 w-full px-4 py-2 border rounded-lg" />
          )}

          <button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full">
            Cadastrar
          </button>
        </div>
      </div>
    </Dashboard>
  );
}
