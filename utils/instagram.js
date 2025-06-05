const { instagramGetUrl } = require('instagram-url-direct');

async function downloadInstagram(url) {
  try {
    const data = await instagramGetUrl(url);
    if (!data || !data.url_list || data.url_list.length === 0) return null;

    const videos = data.url_list.map((u) => ({ quality: 'default', url: u }));

    return {
      title: 'Instagram Media',
      thumbnail: data.url_list[0],
      videos,
    };
  } catch (error) {
    return null;
  }
}

module.exports = { downloadInstagram };
