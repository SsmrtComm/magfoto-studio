import express from 'express';
import twilio from 'twilio';

const app = express();
const port = process.env.PORT || 3000;

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Webhook endpoint for Formspree
app.post('/webhook', async (req, res) => {
  try {
    const { name, email, event_type, event_date, guests, budget, details } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: 'Missing name or email' });
    }

    const message = `
🔔 *Neue MagFoto Anfrage*

👤 Name: ${name}
📧 Email: ${email}
📅 Event: ${event_type || 'N/A'} (${event_date || 'N/A'})
👥 Gäste: ${guests || 'N/A'}
💰 Budget: ${budget || 'N/A'}

📝 Details:
${details || 'Keine Zusatzinfo'}

---
Schnell antworten: hello@magfoto-studio.de
    `.trim();

    const result = await twilioClient.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${process.env.TWILIO_PERSONAL_WHATSAPP}`,
      body: message,
    });

    console.log(`WhatsApp sent: ${result.sid}`);
    res.status(200).json({ success: true, messageSid: result.sid });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Webhook server running on port ${port}`);
});
