const axios = require('axios');

async function downloadPinterest(url) {
  try {
    // This API is public and free (as of 2025) but unofficial!
    const response = await axios.post(
      'https://savepinsta.com/api/ajaxSearch',
      new URLSearchParams({ q: url, t: 'media' }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Origin': 'https://savepinsta.com',
          'Referer': 'https://savepinsta.com/',
          'User-Agent': 'Mozilla/5.0' // helps pass some bot checks
        }
      }
    );

    // The API returns { status: 'ok', data: [ { url: ..., thumbnail: ... } ] }
    if (
      response.data &&
      response.data.status === 'ok' &&
      Array.isArray(response.data.data) &&
      response.data.data.length > 0
    ) {
      const videos = response.data.data.map((f) => ({
        quality: 'default',
        url: f.url,
      }));
      const file = response.data.data[0];
      return {
        title: 'Pinterest Media',
        thumbnail: file.thumbnail || '',
        videos,
      };
    }
    return null;
  } catch (error) {
    return null;
  }
}

module.exports = { downloadPinterest };
