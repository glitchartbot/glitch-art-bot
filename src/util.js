const fs = require('fs');
const got = require('got');
const path = require('path');
const stream = require('stream');
const sketches = require('sketches');
const { promisify } = require('util');
const pipeline = promisify(stream.pipeline);

const getParentTweetId = tweet => tweet.in_reply_to_status_id_str;

const getImageUrl = tweet => tweet.entities.media.find(media => media.type === 'photo').media_url

const hasValidImage = tweet => Boolean(tweet.entities.media && tweet.entities.media.filter(media => media.type === 'photo').length)

const getFilePath = (sketch, fileName) => path.join(sketches.getAssetsPath(sketch), fileName);

async function downloadImage(uri, sketch, { fileName, format = '.png'}) {
  await pipeline(
    got.stream(uri),
    fs.createWriteStream(getFilePath(sketch, `${fileName}${format}`))
  )
}

function saveInfo(path, fileName, format) {
  fs.writeFile(path, `${fileName},${format}`)
}


module.exports = {
  downloadImage,
  getParentTweetId,
  hasValidImage,
  getImageUrl,
  getFilePath,
  saveInfo,
}