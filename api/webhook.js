import twilio from 'twilio';
import nodemailer from 'nodemailer';

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Email via SendGrid (or your email provider)
const emailTransporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY || '',
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, event_type, event_date, guests, budget, details, package: pkg } = req.body;

    // Validate required fields
    if (!email || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Build WhatsApp notification message
    const whatsappMessage = `
🔔 *Neue MagFoto Anfrage*

👤 Name: ${name}
📧 Email: ${email}
📅 Event: ${event_type || 'N/A'} (${event_date || 'N/A'})
👥 Gäste: ${guests || 'N/A'}
💰 Budget: ${budget || 'N/A'}

📝 Details:
${details || 'Keine Zusatzinfo'}

${pkg ? `📦 Paket: ${pkg}` : ''}

---
Schnell antworten: hello@magfoto-studio.de
    `.trim();

    // Send WhatsApp to you
    let whatsappResult = null;
    try {
      whatsappResult = await twilioClient.messages.create({
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${process.env.TWILIO_PERSONAL_WHATSAPP}`,
        body: whatsappMessage,
      });
      console.log(`WhatsApp sent: ${whatsappResult.sid}`);
    } catch (whatsappError) {
      console.error('WhatsApp send failed:', whatsappError.message);
      // Don't fail the request if WhatsApp fails, still send email
    }

    // Send confirmation email to customer (optional, can skip if no email provider set)
    try {
      if (process.env.SENDGRID_API_KEY) {
        await emailTransporter.sendMail({
          from: 'hello@magfoto-studio.de',
          to: email,
          subject: 'MagFoto - Vielen Dank für Ihre Anfrage',
          html: `<p>Hallo ${name},</p><p>vielen Dank für Ihre Anfrage. Wir werden uns schnellstmöglich bei Ihnen melden.</p><p>Beste Grüße,<br/>Das MagFoto Team</p>`,
        });
      }
    } catch (emailError) {
      console.error('Confirmation email failed:', emailError.message);
    }

    return res.status(200).json({
      success: true,
      whatsappSent: !!whatsappResult,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({
      error: 'Form submission failed',
      details: error.message,
    });
  }
}
