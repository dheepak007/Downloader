const ytdl = require('ytdl-core');

async function downloadYouTube(url) {
  if (!ytdl.validateURL(url)) return null;
  const info = await ytdl.getInfo(url);

  const videos = [];
  const seen = new Set();
  for (const f of info.formats) {
    if (f.hasVideo && f.hasAudio && f.qualityLabel && !seen.has(f.qualityLabel)) {
      seen.add(f.qualityLabel);
      videos.push({ quality: f.qualityLabel, url: f.url });
    }
  }

  if (!videos.length) return null;

  return {
    title: info.videoDetails.title,
    thumbnail: info.videoDetails.thumbnails.pop().url,
    videos,
  };
}

module.exports = { downloadYouTube };
