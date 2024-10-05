/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCheckPermissions } from '@hooks/useCheckPermissions'
import { Dashboard } from '@components/Dashboard'

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [validade, setValidade] = useState('');
  const [orgaoExpeditor, setOrgaoExpeditor] = useState('');
  const [telefone1, setTelefone1] = useState('');
  const [telefone2, setTelefone2] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [numLote, setNumLote] = useState('');
  const [dataCompra, setDataCompra] = useState('');
  const [dataPrevista, setDataPrevista] = useState('');
  const [valorLote, setValorLote] = useState('');
  const [valorEntrada, setValorEntrada] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('avista');
  const [valorParcelas, setValorParcelas] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const userType = useCheckPermissions();

  const handleRegister = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name, email, password, cpf, rg, validade, orgaoExpeditor, telefone1, telefone2,
          dataNasc, numLote, dataCompra, dataPrevista, valorLote, valorEntrada, formaPagamento, valorParcelas
        }),
      });
  
      if (response.ok) {
        alert('Usuário criado com sucesso!');
        router.push('/login');
      } else {
        setError('Erro ao criar usuário');
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor');
    }
  };
  

  return (
    <Dashboard>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Cadastro de Usuário</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Cadastro de Acesso do Usuário */}
          <h3 className="font-bold mb-4">Cadastro de Acesso do Usuário</h3>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome completo" className="mb-4 w-full px-4 py-2 border rounded-lg" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="mb-4 w-full px-4 py-2 border rounded-lg" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" className="mb-6 w-full px-4 py-2 border rounded-lg" />

          {/* Informações do Comprador */}
          <h3 className="font-bold mb-4">Informações do Comprador</h3>
          <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="CPF" className="mb-4 w-full px-4 py-2 border rounded-lg" />
          <input type="text" value={rg} onChange={(e) => setRg(e.target.value)} placeholder="RG" className="mb-4 w-full px-4 py-2 border rounded-lg" />
          <input type="text" value={validade} onChange={(e) => setValidade(e.target.value)} placeholder="Validade do RG" className="mb-4 w-full px-4 py-2 border rounded-lg" />
          <input type="text" value={orgaoExpeditor} onChange={(e) => setOrgaoExpeditor(e.target.value)} placeholder="Orgão Expeditor" className="mb-4 w-full px-4 py-2 border rounded-lg" />
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

          <div className="text-center mt-4">
            <a href="/login" className="text-blue-500 hover:underline">
              Já tem uma conta? Entrar
            </a>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

