const express = require('express');
const cors = require('cors');
const path = require('path');

const { downloadYouTube } = require('./utils/youtube');
const { downloadInstagram } = require('./utils/instagram');
const { downloadPinterest } = require('./utils/pinterest');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint
app.post('/api/download', async (req, res) => {
  const { url, service } = req.body;
  if (!url || !service) return res.status(400).json({ error: 'Missing url or service' });

  try {
    let result;
    if (service === 'youtube') result = await downloadYouTube(url);
    else if (service === 'instagram') result = await downloadInstagram(url);
    else if (service === 'pinterest') result = await downloadPinterest(url);
    else return res.status(400).json({ error: 'Unknown service' });

    if (!result) res.status(404).json({ error: 'Download failed or not found' });
    else res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ error: 'Internal error', details: err.message });
  }
});

// Serve frontend for all other routes (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
