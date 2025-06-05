// Disable ytdl-core's auto update check which can fail in restricted networks
process.env.YTDL_NO_UPDATE = '1';
const ytdl = require('ytdl-core');

async function downloadYouTube(url) {
  if (!ytdl.validateURL(url)) return null;
  // Force IPv4 requests to avoid IPv6 connection issues on some hosts
  const info = await ytdl.getInfo(url, { requestOptions: { family: 4 } });
  const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });
  return {
    title: info.videoDetails.title,
    thumbnail: info.videoDetails.thumbnails.pop().url,
    downloadUrl: format.url,
  };
}

module.exports = { downloadYouTube };
