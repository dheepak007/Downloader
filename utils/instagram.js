const instagramGetUrl = require('instagram-url-direct');

async function downloadInstagram(url) {
  try {
    const data = await instagramGetUrl(url);
    if (!data || !data.url_list || data.url_list.length === 0) return null;
    return {
      title: "Instagram Media",
      thumbnail: data.url_list[0],
      downloadUrl: data.url_list[0],
    };
  } catch (error) {
    return null;
  }
}

module.exports = { downloadInstagram };