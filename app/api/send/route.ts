import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  console.log("🔥 1. O SITE CHAMOU A API DE EMAIL!");

  // Verifica se a chave existe
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("❌ ERRO CRÍTICO: Não encontrei a chave RESEND_API_KEY no arquivo .env.local");
    return NextResponse.json({ error: "Chave não configurada" }, { status: 500 });
  }

  console.log("✅ 2. Chave encontrada:", apiKey.substring(0, 5) + "...");

  try {
    const resend = new Resend(apiKey);
    const body = await request.json();
    const { name, email } = body;
    
    console.log(`📩 3. Tentando enviar para: ${email}`);

    const data = await resend.emails.send({
      from: 'Treino Invasores <onboarding@resend.dev>',
      to: [email], 
      subject: 'Teste de Inscrição 🚀',
      html: `<h1>Funcionou!</h1><p>Parabéns ${name}, o sistema está enviando!</p>`,
    });

    if (data.error) {
        console.error("❌ 4. O RESEND RECUSOU:", data.error);
        return NextResponse.json(data, { status: 400 });
    }

    console.log("✅ 5. EMAIL ENVIADO COM SUCESSO! ID:", data.data?.id);
    return NextResponse.json(data);

  } catch (error) {
    console.error("❌ ERRO NO PROCESSO:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}