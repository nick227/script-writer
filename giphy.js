import dotenv from 'dotenv';
import giphy from 'giphy-api';
import fetch from 'node-fetch';
import { createWriteStream } from 'fs';
import { basename, extname } from 'path';

dotenv.config();

const giphyClient = giphy(process.env.GIPHY_API_KEY);

giphyClient.search({
    q: 'cute dog',
    limit: 12,
    fmt: 'json'
  })
  .then((res) => {
    const data = res.data;
    data.forEach((gif) => {
      const title = gif.title.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
      const extension = extname(new URL(gif.images.original.url).pathname);
      const outputPath = `./gifs/${title}${extension}`;
      saveThisImage(gif.images.original.url, outputPath);
    });
  })
  .catch((err) => {
    console.error(err);
  });

async function saveThisImage(url, outputPath) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch the GIF: ${response.statusText}`);
  }

  const fileStream = createWriteStream(outputPath);
  await new Promise((resolve, reject) => {
    response.body.pipe(fileStream);
    response.body.on('error', reject);
    fileStream.on('finish', resolve);
  });
  console.log(`GIF saved to ${outputPath}`);
}
