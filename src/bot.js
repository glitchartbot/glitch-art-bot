const fs = require('fs');
const twit = require('twit');
const myUtil = require('./util');
const config = require('../config');
const T = new twit(config.keys);

const postTweet = async (tweet) => T.post('statuses/update', tweet)

async function uploadImage(sketch, fileName) {
  const filePath = myUtil.getFilePath(sketch, fileName);
  const b64 = fs.readFileSync(filePath, { encoding: 'base64' });

  return await T.post('media/upload', { media_data: b64 });
}

async function tweetStatus(status) {
  const params = { status }

  return await postTweet(params);
}

function listenQuery(query, callback) {
  const stream = T.stream('statuses/filter', { track: query })

  stream.on('tweet', callback)
}

async function getTweetById(tweetId) {
  const params = { id: tweetId }

  return await T.get('statuses/show', params)
}

async function replyTweet(tweetId, { status, fileName }) {
  const { data } = await getTweetById(tweetId);
  const screenName = data.user.screen_name;
  let uploaded;
  let tweet = {
    in_reply_to_status_id: data.id_str, 
    status: `@${screenName}` 
  };

  if (fileName) {
    uploaded = await uploadImage(fileName);
    tweet.media_ids = [uploaded.data.media_id_string];
  }
  
  if (status) {
    tweet.status += ` ${status}`;
  }

  return await postTweet(tweet);
} 

module.exports = {
  tweetStatus,
  listenQuery,
  getTweetById,
  replyTweet
}