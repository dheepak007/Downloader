// Disable ytdl-core's auto update check which can fail in restricted networks
process.env.YTDL_NO_UPDATE = '1';
const ytdl = require('ytdl-core');

async function downloadYouTube(url) {
  if (!ytdl.validateURL(url)) return null;
  const forceIPv4 = process.env.FORCE_IPV4 === '1' || process.env.FORCE_IPV4 === 'true';
  const info = forceIPv4
    ? await ytdl.getInfo(url, { requestOptions: { family: 4 } })
    : await ytdl.getInfo(url);
  const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });
  return {
    title: info.videoDetails.title,
    thumbnail: info.videoDetails.thumbnails.pop().url,
    downloadUrl: format.url,
  };
}

module.exports = { downloadYouTube };
