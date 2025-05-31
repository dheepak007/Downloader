const ytdl = require('ytdl-core');

async function downloadYouTube(url) {
  if (!ytdl.validateURL(url)) return null;
  const info = await ytdl.getInfo(url);
  const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });
  return {
    title: info.videoDetails.title,
    thumbnail: info.videoDetails.thumbnails.pop().url,
    downloadUrl: format.url,
  };
}

module.exports = { downloadYouTube };