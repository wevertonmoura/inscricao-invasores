"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase'; 
import confetti from 'canvas-confetti';
import { 
  MapPin, Calendar, Clock, CheckCircle, 
  AlertCircle, ArrowRight, Activity, Zap, Trophy, Mail, MessageCircle, 
  Loader2, Lock, HelpCircle, Instagram, CalendarPlus 
} from 'lucide-react';

// --- ⚙️ CONFIGURAÇÃO GERAL ---
const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/BEjOT8bcJkZB8D8Krzxr3R";
const INSTAGRAM_LINK = "https://www.instagram.com/invasores_081?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";

// DATA DO EVENTO
const EVENTO_DATA = '2026-01-25T06:30:00'; 
const DATA_LIMITE = new Date(EVENTO_DATA); 

const EVENT_CONFIG = {
  name: "TREINÃO INVASORES",
  tagline: "Todo dia é dia de invadir seus próprios limites",
  date: "25/01/2026",
  location: "2º Jardim Boa Viagem (Quiosque 10)",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=-8.106071,-34.88696",
  time: "06:30 pontualmente",
  pace: "Distâncias: 3km • 5km • 10km"
};

// --- COMPONENTES VISUAIS ---

const Card = ({ children, className = "", highlight = false }: { children: React.ReactNode, className?: string, highlight?: boolean }) => (
  <div className={`
    p-6 rounded-2xl border transition-all duration-300
    ${highlight 
      ? 'bg-orange-600 border-orange-500 text-white shadow-lg shadow-orange-900/50' 
      : 'bg-slate-900 border-slate-800 text-slate-200 shadow-xl hover:border-orange-500/30'
    }
    ${className}
  `}>
    {children}
  </div>
);

// --- COMPONENTE CRONÔMETRO ---
const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<any>({});
  const [mounted, setMounted] = useState(false);

  const calculateTimeLeft = () => {
    const difference = +new Date(EVENTO_DATA) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        min: Math.floor((difference / 1000 / 60) % 60),
        seg: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const timerComponents: any = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval] && timeLeft[interval] !== 0) return;

    timerComponents.push(
      <div key={interval} className="flex flex-col items-center bg-slate-900/80 border border-slate-800 p-3 rounded-xl min-w-[70px] backdrop-blur-sm">
        <span className="text-2xl md:text-3xl font-black text-white font-mono">
          {timeLeft[interval] < 10 ? `0${timeLeft[interval]}` : timeLeft[interval]}
        </span>
        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
          {interval}
        </span>
      </div>
    );
  });

  if (timerComponents.length === 0) {
    return <div className="text-orange-500 font-black text-xl animate-pulse">É HOJE! 🚀</div>;
  }

  return (
    <div className="flex gap-2 justify-center mb-8">
      {timerComponents}
    </div>
  );
};

// --- FAQ SECTION ---
const FAQSection = () => {
  const faqs = [
    { p: "Preciso pagar algo?", r: "Não! O treino é 100% gratuito e aberto ao público." },
    { p: "Tem guarda-volumes?", r: "Si teremos estrutura oficial de guarda-volumes. Recomendamos levar apenas o essencial." },
    { p: "Iniciante pode ir?", r: "Com certeza! Temos a opção de 3km caminhada/trote justamente para quem está começando." },
  ];

  return (
    <section className="py-16 px-4 bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <HelpCircle className="w-10 h-10 text-orange-500 mx-auto mb-4" />
          <h2 className="text-3xl font-black text-white italic tracking-tight">DÚVIDAS FREQUENTES</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800 p-5 rounded-xl hover:border-orange-500/30 transition-colors">
              <h3 className="font-bold text-white text-lg mb-2 flex items-center gap-2">
                <span className="text-orange-500">?</span> {faq.p}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed pl-4 border-l-2 border-slate-800">
                {faq.r}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- HERO SECTION ---
const Hero = ({ onRegisterClick }: { onRegisterClick: () => void }) => (
  <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-slate-950">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />
    
    <div className="container mx-auto max-w-lg text-center relative z-10">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-900/30 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-8">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
        </span>
        Treino Aberto • Invasores
      </div>

      <h1 className="text-6xl md:text-7xl font-black italic tracking-tighter text-white mb-6 leading-[0.9]">
        TREINÃO<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
          INVASORES
        </span>
      </h1>

      <p className="text-slate-400 text-lg mb-8 max-w-xs mx-auto leading-relaxed">{EVENT_CONFIG.tagline}</p>
      
      <Countdown />

      <button 
        onClick={onRegisterClick}
        className="group relative w-full max-w-xs mx-auto bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-black text-lg py-4 px-8 rounded-xl shadow-lg shadow-orange-900/40 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3"
      >
        QUERO PARTICIPAR
        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </section>
);

// --- INFO SECTION ---
const InfoSection = () => (
  <section className="py-10 px-4 bg-slate-950">
    <div className="container mx-auto max-w-lg space-y-4">
      <div className="text-center mb-10">
        <div className="w-16 h-1 bg-orange-600 mx-auto rounded-full mb-6" />
        <h2 className="text-3xl font-black text-white italic tracking-tight">O TREINO</h2>
        <p className="text-slate-400 mt-4 text-lg">
          Do iniciante ao avançado: <span className="text-white font-bold">escolha sua distância</span> e venha curtir a energia do grupo.
        </p>
      </div>

      <a href={EVENT_CONFIG.mapsLink} target="_blank" rel="noopener noreferrer" className="block group">
        <Card className="flex items-center gap-5 cursor-pointer hover:bg-slate-900/80 hover:border-orange-500/60 transition-all">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-orange-500 group-hover:bg-orange-600 group-hover:text-white transition-colors">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider group-hover:text-orange-400 transition-colors">Ponto de Encontro</p>
              <span className="text-[10px] bg-orange-500/10 text-orange-500 px-1.5 py-0.5 rounded border border-orange-500/20 group-hover:bg-orange-500 group-hover:text-white transition-colors font-bold">VER NO MAPA</span>
            </div>
            <p className="text-white font-bold text-lg underline decoration-slate-700 underline-offset-4 group-hover:decoration-orange-500 transition-all">
              {EVENT_CONFIG.location}
            </p>
          </div>
        </Card>
      </a>

      <Card className="flex items-center gap-5">
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-orange-500">
          <Calendar className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Data</p>
          <p className="text-white font-bold text-lg">{EVENT_CONFIG.date}</p>
        </div>
      </Card>

      <Card className="flex items-center gap-5">
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-orange-500">
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Largada</p>
          <p className="text-white font-bold text-lg">{EVENT_CONFIG.time}</p>
        </div>
      </Card>

      <Card className="flex items-center gap-5">
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-orange-500">
          <Trophy className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Opções</p>
          <p className="text-white font-bold text-lg leading-tight">{EVENT_CONFIG.pace}</p>
        </div>
      </Card>
    </div>
  </section>
);

const QuoteSection = () => (
  <section className="py-16 px-4 bg-orange-600 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-multiply"></div>
    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
    <div className="container mx-auto max-w-lg text-center relative z-10">
      <Zap className="w-12 h-12 text-white/90 mx-auto mb-4 animate-pulse" />
      <h2 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter leading-tight">
        "A ÚNICA COMPETIÇÃO É COM VOCÊ MESMO."
      </h2>
    </div>
  </section>
);

// --- FORMULÁRIO COMPLETO ---
const RegistrationForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [errors, setErrors] = useState({ name: false, email: false });
  const [confirmedData, setConfirmedData] = useState<any>(null); 
  const [isFreshRegistration, setIsFreshRegistration] = useState(false);
  
  const agora = new Date();
  const inscricoesEncerradas = agora > DATA_LIMITE;
  const [formData, setFormData] = useState({ name: '', email: '', distance: '5km', health: '', health_details: '', termsAccepted: false });

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('invasores_inscricao');
    if (dadosSalvos) {
      setConfirmedData(JSON.parse(dadosSalvos));
      setSuccess(true);
    }
  }, []);

  const isEmailValid = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#f97316', '#ffffff'] });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#f97316', '#ffffff'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  const handleReset = () => {
    localStorage.removeItem('invasores_inscricao');
    setSuccess(false);
    setConfirmedData(null);
    setIsFreshRegistration(false);
    setFormData({ name: '', email: '', distance: '5km', health: '', health_details: '', termsAccepted: false });
  };

  const handleSubmit = async () => {
    setErrors({ name: false, email: false });
    setErrorMsg('');

    if(!formData.name || !formData.email || !formData.distance || !formData.health || !formData.termsAccepted) {
      setErrorMsg("Por favor, preencha todos os campos e aceite os termos.");
      return;
    }

    // Validação de Nome (Sem sobrenome obrigatório, apenas min 3 letras)
    if (formData.name.trim().length < 3) {
      setErrorMsg("O nome precisa ter pelo menos 3 letras.");
      setErrors(prev => ({ ...prev, name: true }));
      return;
    }

    // Validação de E-mail
    if (!isEmailValid(formData.email)) {
      setErrorMsg("E-mail inválido! Verifique se digitou corretamente.");
      setErrors(prev => ({ ...prev, email: true }));
      return;
    }

    const emailDomain = formData.email.split('@')[1].toLowerCase();
    const dominiosProibidos = ['teste.com', 'test.com', 'exemplo.com', 'example.com', 'yopmail.com', 'mailinator.com', '10minutemail.com', 'naotem.com', 'naoexiste.com', 'b.com', 'a.com'];
    const errosComuns = ['gmil.com', 'gmai.com', 'hotmal.com', 'outlok.com', 'yaho.com', 'yarou.com'];

    if (dominiosProibidos.includes(emailDomain)) {
      setErrorMsg("Por favor, use um e-mail válido (não aceitamos e-mails temporários).");
      setErrors(prev => ({ ...prev, email: true }));
      return;
    }

    if (errosComuns.includes(emailDomain)) {
      setErrorMsg(`Você quis dizer "${emailDomain.replace('gmil', 'gmail').replace('yarou', 'yahoo')}"?`);
      setErrors(prev => ({ ...prev, email: true }));
      return;
    }

    setLoading(true);

    try {
      const { data: jaExiste } = await supabase.from('inscricoes').select('id').eq('email', formData.email).maybeSingle();
      if (jaExiste) {
        setErrorMsg("Este e-mail já está inscrito! 🛑");
        setErrors(prev => ({ ...prev, email: true }));
        setLoading(false);
        return; 
      }

      const { data, error } = await supabase.from('inscricoes').insert([{ name: formData.name, email: formData.email, level: formData.distance, health: formData.health, health_details: formData.health_details, terms_accepted: formData.termsAccepted, age: null, phone: 'Não informado' }]).select().single();
      if (error) throw error;

      localStorage.setItem('invasores_inscricao', JSON.stringify(data));
      setConfirmedData(data);
      setIsFreshRegistration(true);
      triggerConfetti();
      setSuccess(true);
    } catch (error) {
      console.error('Erro:', error);
      setErrorMsg("Erro ao realizar inscrição. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success && confirmedData && isFreshRegistration) {
      const timer = setTimeout(() => { window.location.href = WHATSAPP_GROUP_LINK; }, 4000); 
      return () => clearTimeout(timer);
    }
  }, [success, confirmedData, isFreshRegistration]);

  if (success && confirmedData) {
    const shareText = encodeURIComponent(`Fala! Me inscrevi no Treino Invasores dia 25/01. 🏃‍♂️💨\n\nBora comigo? É gratuito!\nGaranta sua vaga aqui: https://inscricao-invasores.vercel.app`);
    const shareLink = `https://wa.me/?text=${shareText}`;
    
    // Link do Google Calendar
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(EVENT_CONFIG.name)}&dates=20260125T093000Z/20260125T130000Z&details=${encodeURIComponent(EVENT_CONFIG.tagline)}&location=${encodeURIComponent(EVENT_CONFIG.location)}`;

    return (
      <div id="inscricao" className="bg-slate-950 px-4 pt-20 pb-4">
        <div className="container mx-auto max-w-lg">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-black text-white italic uppercase mb-2">Tudo Certo!</h2>
            <p className="text-slate-400">Te esperamos no dia 25.</p>
          </div>
          
          {/* --- BLOCO DO COMPROVANTE (SEM BRILHO LARANJA) --- */}
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-orange-500/50 rounded-2xl p-6 shadow-2xl shadow-orange-900/20 mb-8 overflow-hidden">
            
            {/* ✨ MARCA D'ÁGUA (Preenchimento Total / Logo Nova) */}
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.1] pointer-events-none overflow-hidden rounded-2xl">
               <img 
                 src="/logo-nova.jpg" 
                 alt="Marca D'agua" 
                 className="w-full h-full object-cover grayscale" 
               />
            </div>

            {/* AQUI NÃO TEM MAIS A DIV DO BRILHO LARANJA */}
            
            <div className="relative z-10 text-center">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest border border-orange-500/30 px-3 py-1 rounded-full bg-orange-900/20">
                Comprovante de Inscrição
              </span>
              
              <div className="my-6">
                {/* 🏅 SELO VIP */}
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="w-full h-full rounded-full border-4 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)] bg-slate-950 flex items-center justify-center overflow-hidden">
                    <img src="/icon.png" alt="Selo Invasores" className="w-full h-full object-cover opacity-90" />
                  </div>
                  <div className="absolute bottom-0 right-0 bg-green-500 text-slate-900 rounded-full p-1.5 border-4 border-slate-900">
                    <CheckCircle size={16} strokeWidth={4} />
                  </div>
                </div>
                
                {/* 🔢 NÚMERO */}
                <div className="mb-2">
                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Número da Inscrição</span>
                  <p className="text-5xl font-black text-white font-mono tracking-tighter mt-1 shadow-black drop-shadow-lg">
                    #{confirmedData.numero_inscricao || "..."}
                  </p>
                </div>

                <p className="text-xl font-black text-orange-500 italic uppercase mt-4">VAGA GARANTIDA</p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-700/50 pt-4">
                <div className="text-left">
                  <p className="text-xs text-slate-500 uppercase font-bold">Atleta</p>
                  <p className="text-white font-bold truncate capitalize">{confirmedData.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 uppercase font-bold">Distância</p>
                  <p className="text-orange-500 font-bold text-lg">{confirmedData.level}</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-between items-center">
                <div className="flex items-center gap-2 text-slate-400">
                  <Mail size={14} />
                  <span className="text-[10px] truncate max-w-[150px]">{confirmedData.email}</span>
                </div>
                
              </div>
            </div>
          </div>

       <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center space-y-3">
            {isFreshRegistration ? (
              <div className="flex flex-col items-center justify-center gap-2 text-slate-300 mb-6 animate-pulse"><Loader2 className="w-5 h-5 animate-spin text-green-500" /><p className="text-sm font-bold">Abrindo o Grupo VIP...</p></div>
            ) : ( <p className="text-slate-400 text-sm mb-4">Passos Importantes:</p> )}
            
            {/* 1. BOTÃO GRUPO VIP (AGORA COM ÍCONE OFICIAL) */}
            <a 
              href={WHATSAPP_GROUP_LINK} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block w-full bg-green-600 hover:bg-green-500 text-white font-black text-lg py-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 animate-pulse hover:animate-none"
            >
              {/* SVG Oficial do WhatsApp */}
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="text-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              ENTRAR NO GRUPO VIP
            </a>
            
            {/* 2. BOTÃO CHAMAR AMIGO (MANTIDO IGUAL) */}
            <a 
              href={shareLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block w-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 hover:from-white hover:to-orange-300 text-white hover:text-orange-900 font-black text-lg py-4 rounded-xl shadow-[0_0_15px_rgba(249,115,22,0.5)] transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 animate-pulse hover:animate-none"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="text-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              CHAMAR UM PARCEIRO(A)
            </a>

            <a href={googleCalendarUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-slate-400 text-xs font-bold hover:text-orange-500 transition-colors mt-4">
              <CalendarPlus size={16} /> Salvar na Agenda (Google)
            </a>
            
            <button onClick={handleReset} className="text-slate-500 font-bold underline hover:text-white text-xs mt-6 block mx-auto">Nova Inscrição </button>
          </div>
        </div>
      </div>
    );
  }

  if (inscricoesEncerradas) {
    return (
      <div id="inscricao" className="bg-slate-950 px-4 py-20 pb-32">
        <div className="container mx-auto max-w-lg text-center">
          <div className="bg-slate-900 border border-slate-800 p-10 rounded-3xl opacity-90 shadow-2xl">
            <Lock className="w-10 h-10 mx-auto mb-4 text-slate-500" />
            <h2 className="text-3xl font-black text-white italic uppercase mb-4">Inscrições Encerradas</h2>
            <p className="text-slate-400 text-lg">O evento já aconteceu ou atingimos a data limite.</p>
            <p className="text-orange-500 font-bold mt-6 text-xl">Nos vemos no próximo! 🚀</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="inscricao" className="bg-slate-950 px-4 py-20 pb-32">
      <div className="container mx-auto max-w-lg">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">Garanta sua Vaga</h2>
          <div className="w-24 h-1.5 bg-orange-600 mx-auto mt-4 rounded-full" />
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl shadow-2xl">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Nome</label>
              <input type="text" placeholder="Nome ou como vc gosta de ser chamado" 
                className={`w-full bg-slate-950 border text-white p-4 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all placeholder:text-slate-600 ${errors.name ? 'border-red-500 animate-pulse' : 'border-slate-800'}`}
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">E-mail</label>
              <div className="relative">
                <input type="email" placeholder="seu@email.com" 
                  className={`w-full bg-slate-950 border text-white p-4 pl-12 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all placeholder:text-slate-600 ${errors.email ? 'border-red-500 animate-pulse' : 'border-slate-800'}`}
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                />
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.email ? 'text-red-500' : 'text-slate-500'}`} />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Sua Meta para o dia</label>
              <div className="grid grid-cols-3 gap-2">
                {['3km', '5km', '10km'].map((dist) => (
                  <button key={dist} onClick={() => setFormData({...formData, distance: dist})} 
                    className={`py-3 px-2 rounded-lg text-sm font-bold border transition-all ${formData.distance === dist ? 'bg-orange-600 text-white border-orange-500 shadow-lg shadow-orange-900/40' : 'bg-slate-950 text-slate-500 border-slate-800 hover:border-slate-700'}`}
                  >
                    {dist}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-pink-500/20 rounded-full"><Activity className="w-4 h-4 text-pink-500" /></div>
                <label className="text-sm font-bold text-slate-200">Possui alguma condição de saúde?</label>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setFormData({...formData, health: 'Não'})} className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${formData.health === 'Não' ? 'bg-green-500/10 border-green-500 text-green-400' : 'bg-slate-950 border-slate-800 text-slate-500 hover:bg-slate-800'}`}>
                  <span className="font-bold">Não, sou apto</span><CheckCircle className="w-5 h-5" />
                </button>
                <button onClick={() => setFormData({...formData, health: 'Sim'})} className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${formData.health === 'Sim' ? 'bg-red-500/10 border-red-500 text-red-400' : 'bg-slate-950 border-slate-800 text-slate-500 hover:bg-slate-800'}`}>
                  <span className="font-bold">Sim, tenho</span><AlertCircle className="w-5 h-5" />
                </button>
              </div>
              
              {formData.health === 'Sim' && (
                <div className="mt-2">
                  <input type="text" placeholder="Qual? (Ex: Asma, Hipertensão...)" 
                    className="w-full bg-slate-950 border border-red-500/30 text-white p-4 rounded-xl focus:ring-2 focus:ring-red-500 outline-none placeholder:text-slate-600"
                    value={formData.health_details} onChange={e => setFormData({...formData, health_details: e.target.value})} 
                  />
                </div>
              )}
            </div>

            <label className="flex gap-3 items-start p-4 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
              <input type="checkbox" checked={formData.termsAccepted} onChange={e => setFormData({...formData, termsAccepted: e.target.checked})} className="mt-1 w-5 h-5 accent-orange-500 rounded bg-slate-800 border-slate-700" />
              <span className="text-xs text-slate-400 leading-relaxed">Declaro que estou apto fisicamente para participar do treino, isento o grupo Invasores de responsabilidade e autorizo o uso da minha imagem em fotos e vídeos.</span>
            </label>

            {errorMsg && <div className="text-red-400 text-sm text-center font-bold bg-red-500/10 p-3 rounded-lg border border-red-500/20">{errorMsg}</div>}

            <button onClick={handleSubmit} disabled={loading} className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-black text-lg py-5 rounded-xl shadow-lg shadow-orange-900/40 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center justify-center">
              {loading ? <span className="flex items-center gap-2"><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Confirmando...</span> : "CONFIRMAR INSCRIÇÃO"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const scrollToForm = () => { document.getElementById('inscricao')?.scrollIntoView({ behavior: 'smooth' }); };
  return (
    <main className="min-h-screen bg-slate-950 font-sans selection:bg-orange-500 selection:text-white scroll-smooth">
      <nav className="fixed w-full z-50 top-0 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 h-20 flex items-center shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-slate-700">
              <img src="/icon.png" alt="Logo Invasores" className="w-full h-full object-cover" />
            </div>
            <span className="font-black text-white tracking-tighter italic hidden sm:block text-xl">INVASORES</span>
          </div>
          <button onClick={scrollToForm} className="bg-white text-slate-900 px-6 py-2 rounded-full text-sm font-bold hover:bg-slate-200 transition-colors">PARTICIPAR</button>
        </div>
      </nav>
      <Hero onRegisterClick={scrollToForm} />
      <InfoSection />
      <QuoteSection />
      <FAQSection />
      <RegistrationForm />
      
      <footer className="bg-slate-950 pt-8 pb-8 border-t border-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent blur-sm"></div>

        <div className="container mx-auto px-4 text-center">
          
          <div className="mb-8">
            <span className="text-2xl font-black text-slate-700 italic tracking-tighter hover:text-slate-500 transition-colors cursor-default">
              INVASORES
            </span>
          </div>

          <div className="flex justify-center items-center gap-6 mb-8">
            <a 
              href={INSTAGRAM_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-4 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-pink-500 hover:bg-gradient-to-tr from-purple-500/20 to-orange-500/20 transition-all transform hover:scale-110 shadow-lg hover:shadow-pink-500/20"
            >
              <Instagram size={24} />
            </a>

            <a 
              href={WHATSAPP_GROUP_LINK}
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-4 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-green-500 hover:bg-green-500/20 transition-all transform hover:scale-110 shadow-lg hover:shadow-green-500/20"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="0" fill="currentColor" className="group-hover:fill-green-500 transition-colors">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </a>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-slate-600 text-xs">© 2026 Grupo Invasores. Todos os direitos reservados.</p>
            
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-6 py-3 px-6 rounded-lg bg-slate-900 border border-slate-800 text-orange-500 font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2 mx-auto"
            >
              Voltar ao Topo <ArrowRight className="-rotate-90 w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}