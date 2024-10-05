import { ReactNode } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Cliente {
    id: ReactNode;
    name: string;
    email: string;
    cpf: string;
    rg: string;
    dataExp: string;
    orgaoExp: string;
    telefone1: string;
    telefone2: string;
    dataNasc: string;
    numLote: string;
    dataCompra: string;
    dataPrevista: string;
    valorLote: string;
    valorEntrada: string;
    formaPagamento: string;
    valorParcelas: string | null;
  }
  
  export async function fetchClientes(): Promise<Cliente[]> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/clientes`);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar clientes');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      throw error; // Repassa o erro para o componente que consumir esse serviço
    }
  }
  
  export async function registerCliente(clienteData: any): Promise<void> {
    console.log(clienteData)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clienteData),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao registrar cliente');
      }
    } catch (error) {
      console.error('Erro ao registrar cliente:', error);
      throw error;
    }
  }

  export async function fetchClienteById(id: number): Promise<Cliente> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/clientes/${id}`);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar cliente');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
      throw error;
    }
  }
  
  