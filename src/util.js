const fs = require('fs');
const got = require('got');
const path = require('path');
const stream = require('stream');
const sketches = require('./sketches');
const { promisify } = require('util');
const pipeline = promisify(stream.pipeline);

const getParentTweetId = tweet => tweet.in_reply_to_status_id_str;

const hasValidImage = tweet => Boolean(tweet.entities.media && tweet.entities.media.filter(media => media.type === 'photo').length)

const getFilePath = (sketch, fileName) => path.join(sketches.getAssetsPath(sketch), fileName);

const getImageUrl = (tweet, withSize) => 
  withSize ? 
  (tweet.entities.media.find(media => media.type === 'photo').media_url).concat('?name=large') :
  tweet.entities.media.find(media => media.type === 'photo').media_url

const getFileFormat = tweet => getImageUrl(tweet, false).match(/\.[0-9a-z]+$/i)[0];

const getTweetUrl = tweet => `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`

async function downloadImage(uri, sketch, { fileName, fileFormat = '.png'}) {
  await pipeline(
    got.stream(uri),
    fs.createWriteStream(getFilePath(sketch, `${fileName}${fileFormat}`))
  )
}

function saveInfo(setupPath, fileName, fileFormat) {
  fs.writeFileSync(setupPath, `${fileName},${fileFormat}`)
}

function log(content) {
  const json = JSON.stringify(content, null, 2);
  fs.writeFileSync('log.json', json);
}


module.exports = {
  downloadImage,
  getParentTweetId,
  hasValidImage,
  getImageUrl,
  getFilePath,
  getFileFormat,
  saveInfo,
  log,
  getTweetUrl
}