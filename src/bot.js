const fs = require('fs');
const got = require('got');
const stream = require('stream');
const { promisify } = require('util');
const twit = require('twit');

const config = require('../config');
const T = new twit(config.keys);
const pipeline = promisify(stream.pipeline);

async function downloadImage(uri, fileName) {
  await pipeline(
    got.stream(uri),
    fs.createWriteStream(`images/${fileName}.png`)
  )
}

async function tweetImage(fileName, status, callback) {
  if (typeof status === 'function') {
    callback = status;
    status = null;
  }
  
  try {
    const filePath = `images/${fileName}`;
    const b64 = fs.readFileSync(filePath, { encoding: 'base64' });
    const uploaded = await T.post('media/upload', { media_data: b64 });

    const imageId = uploaded.data.media_id_string;
    const tweet = { media_ids: [imageId] };
    status ? tweet.status = status : undefined;

    return await T.post('statuses/update', tweet);
  } catch (error) {
    throw error;
  }
}

async function tweetStatus(status, callback) {
  const params = { status }

  return await T.post('statuses/update', params)
}

function listenQuery(query, callback) {
  const stream = T.stream('statuses/filter', { track: query })

  stream.on('tweet', tweet => {
    const json = JSON.stringify(tweet, null, 2);
    fs.writeFile('tweet.json', json);
  })

  // stream.on('tweet', callback)
}

function getTweetById(tweetId, callback) {
  const params = { id: tweetId }

  T.get('statuses/show', params, (err, data, res) => {
    const json = JSON.stringify(data, null, 2);
    fs.writeFile('tweetId2.json', json);
  })

  // return await T.get('statuses/show', params)
}

module.exports = {
  tweetStatus,
  listenQuery,
  getTweetById,
  downloadImage,
  tweetImage
}