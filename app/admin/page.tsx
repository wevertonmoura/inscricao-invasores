"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Importante para navegação
import { supabase } from '../lib/supabase';
import { Trophy, Users, Activity, Trash2, Copy, Check, Lock, ChevronRight, Home, ArrowLeft } from 'lucide-react';

// --- 🔒 CONFIGURAÇÃO DE SEGURANÇA ---
const SENHA_SECRETA = "85113257"; // <--- Sua senha

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [inscritos, setInscritos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Se já estiver autenticado, busca os dados
  useEffect(() => {
    if (isAuthenticated) {
      fetchInscritos();
    }
  }, [isAuthenticated]);

  async function fetchInscritos() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('inscricoes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInscritos(data || []);
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao carregar lista.');
    } finally {
      setLoading(false);
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === SENHA_SECRETA) {
      setIsAuthenticated(true);
    } else {
      alert("Senha incorreta! Tente novamente.");
      setPasswordInput("");
    }
  };

  const handleCopyEmails = () => {
    const listaEmails = inscritos
      .map(i => i.email)
      .filter(email => email && email.includes('@'))
      .join(', ');

    if (!listaEmails) {
      alert("Nenhum e-mail encontrado.");
      return;
    }
    navigator.clipboard.writeText(listaEmails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir esta inscrição?")) return;
    try {
      const { error } = await supabase.from('inscricoes').delete().eq('id', id);
      if (error) throw error;
      setInscritos(inscritos.filter(i => i.id !== id));
    } catch (error) {
      alert('Erro ao excluir. Verifique permissões SQL.');
    }
  };

  // --- TELA DE BLOQUEIO (LOGIN) 🔒 ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative">
        
        {/* Botão Voltar (Canto superior esquerdo) */}
        <Link href="/" className="absolute top-6 left-6 text-slate-500 hover:text-white flex items-center gap-2 transition-colors font-bold text-sm">
          <ArrowLeft size={18} /> Voltar ao Site
        </Link>

        <form onSubmit={handleLogin} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-orange-500" />
          </div>
          <h1 className="text-2xl font-black text-white italic mb-2">ÁREA RESTRITA</h1>
          <p className="text-slate-400 text-sm mb-6">Digite a senha de administrador para acessar os dados.</p>
          
          <input 
            type="password" 
            placeholder="Senha de acesso"
            className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-lg focus:border-orange-500 outline-none mb-4 text-center tracking-widest"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            autoFocus
          />
          
          <button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2">
            ACESSAR PAINEL <ChevronRight size={18} />
          </button>
        </form>
      </div>
    );
  }

  // --- PAINEL PRINCIPAL ---
  const total = inscritos.length;
  const km3 = inscritos.filter(i => i.level === '3km').length;
  const km5 = inscritos.filter(i => i.level === '5km').length;
  const km10 = inscritos.filter(i => i.level === '10km').length;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans">
      
      {/* Cabeçalho */}
      <div className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
             <Link href="/" className="bg-slate-800 hover:bg-slate-700 p-2 rounded-lg text-slate-300 transition-colors" title="Ir para o Início">
                <Home size={20} />
             </Link>
             <h1 className="text-3xl font-black text-white italic tracking-tighter">
              PAINEL DO <span className="text-orange-500">ADMIN</span>
            </h1>
          </div>
          <p className="text-slate-500">Gerencie as inscrições aqui</p>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={handleCopyEmails}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${copied ? 'bg-green-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? "Copiado!" : "Copiar E-mails"}
          </button>
          <button onClick={fetchInscritos} className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-orange-900/20">
            🔄 Atualizar
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3 mb-2 text-slate-400"><Users size={20} /> <span className="text-xs font-bold uppercase">Total</span></div>
          <p className="text-4xl font-black text-white">{total}</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3 mb-2 text-green-400"><Trophy size={20} /> <span className="text-xs font-bold uppercase">3km</span></div>
          <p className="text-4xl font-black text-white">{km3}</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3 mb-2 text-orange-400"><Trophy size={20} /> <span className="text-xs font-bold uppercase">5km</span></div>
          <p className="text-4xl font-black text-white">{km5}</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3 mb-2 text-purple-400"><Trophy size={20} /> <span className="text-xs font-bold uppercase">10km</span></div>
          <p className="text-4xl font-black text-white">{km10}</p>
        </div>
      </div>

      {/* Tabela */}
      <div className="max-w-6xl mx-auto bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-950 text-slate-200 uppercase font-bold text-xs tracking-wider">
              <tr>
                <th className="p-4">Nome</th>
                <th className="p-4">Distância</th>
                <th className="p-4">Email</th>
                <th className="p-4">Saúde</th>
                <th className="p-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500 animate-pulse">Carregando lista...</td></tr>
              ) : inscritos.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">Ninguém se inscreveu ainda.</td></tr>
              ) : (
                inscritos.map((pessoa) => (
                  <tr key={pessoa.id} className="hover:bg-slate-800/50 transition-colors group">
                    <td className="p-4 font-bold text-white capitalize">{pessoa.name}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold
                        ${pessoa.level === '3km' ? 'bg-green-500/20 text-green-400' : ''}
                        ${pessoa.level === '5km' ? 'bg-orange-500/20 text-orange-400' : ''}
                        ${pessoa.level === '10km' ? 'bg-purple-500/20 text-purple-400' : ''}
                      `}>{pessoa.level}</span>
                    </td>
                    <td className="p-4 select-all">{pessoa.email || '-'}</td>
                    <td className="p-4">
                      {pessoa.health === 'Sim' ? (
                        <span className="flex items-center gap-2 text-red-400 font-bold bg-red-500/10 px-2 py-1 rounded w-fit"><Activity size={14} />{pessoa.health_details}</span>
                      ) : (
                        <span className="text-green-500 flex items-center gap-1 opacity-50"><CheckCircleIcon /> Apto</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <button onClick={() => handleDelete(pessoa.id)} className="text-slate-600 hover:text-red-500 transition-colors p-2 rounded hover:bg-red-500/10" title="Excluir"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);