import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { name, email, message } = req.body;

  try {
    // 管理者へ通知
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'y.yahagi.kohosya@gmail.com',
      subject: 'お問い合わせが届きました',
      html: `
        <p>名前：${name}</p>
        <p>メール：${email}</p>
        <p>内容：${message}</p>
      `,
    });

    // 自動返信
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'お問い合わせありがとうございます',
      html: `
        <p>${name} 様</p>
        <p>この度はお問い合わせありがとうございます。</p>
        <p>担当よりご連絡いたします。</p>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({ error });
  }
}