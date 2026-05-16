import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message, eventType, date } = req.body;

    // Validate required fields
    if (!email || !message) {
      return res.status(400).json({ error: 'Missing email or message' });
    }

    // Build WhatsApp message
    const whatsappMessage = `
🔔 *Neue MagFoto Anfrage*

👤 Name: ${name || 'N/A'}
📧 Email: ${email}
📞 Telefon: ${phone || 'N/A'}
📅 Event: ${eventType || 'N/A'} ${date ? `(${date})` : ''}

💬 Nachricht:
${message}

---
Link zur Antwort: https://magnet.vercel.app (check email)
    `.trim();

    // Send WhatsApp via Twilio
    const result = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${process.env.TWILIO_PERSONAL_WHATSAPP}`,
      body: whatsappMessage,
    });

    console.log(`WhatsApp sent: ${result.sid}`);

    // Return success
    return res.status(200).json({
      success: true,
      messageId: result.sid,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({
      error: 'Failed to send WhatsApp',
      details: error.message,
    });
  }
}
