const fs = require('fs');
const got = require('got');
const path = require('path');
const stream = require('stream');
const { promisify } = require('util');
const pipeline = promisify(stream.pipeline);

const IMAGES_PATH = 'images/';

const getParentTweetId = tweet => tweet.in_reply_to_status_id_str;

const getImageUrl = tweet => tweet.entities.media.find(media => media.type === 'photo').media_url

const hasValidImage = tweet => 
  Boolean(
    tweet.entities.media 
    && tweet.entities.media.filter(media => media.type === 'photo').length
  )

const getFilePath = fileName => path.join(IMAGES_PATH, fileName);  

async function downloadImage(uri, fileName) {
  await pipeline(
    got.stream(uri),
    fs.createWriteStream(`images/${fileName}.png`)
  )
}


module.exports = {
  downloadImage,
  getParentTweetId,
  hasValidImage,
  getImageUrl,
  getFilePath
}