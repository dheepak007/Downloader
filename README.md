# Lite Downloader Backend

A simple Node.js server for downloading media from YouTube, Instagram, and Pinterest.

## Environment Variables

- `PORT` – port to run the server (default: `4000`).
- `FORCE_IPV4` – set to `true` to force IPv4 connections when contacting YouTube. This can help if IPv6 networking is unreliable.
- `YTDL_NO_UPDATE` – disable automatic update checks for `ytdl-core`.

## Running Locally

```bash
npm install
npm start
```

