const fs = require('fs');
const twit = require('twit');
const myUtil = require('./util');
const config = require('../config');
const T = new twit(config.keys);
const ID = '1232403291151196160';

const postTweet = async (tweet) => T.post('statuses/update', tweet)

async function getTweetById(tweetId) {
  const params = { id: tweetId }

  return await T.get('statuses/show', params)
}

async function uploadImage(sketch, fileName) {
  const filePath = myUtil.getFilePath(sketch, fileName);
  const b64 = fs.readFileSync(filePath, { encoding: 'base64' });

  return await T.post('media/upload', { media_data: b64 });
}

async function tweetStatus(status) {
  try {
    const tweet = { status }
  
    return await postTweet(tweet);
  } catch (error) {
    
  }
}

function listenQuery(query, callback) {
  const stream = T.stream('statuses/filter', { track: query })

  stream.on('tweet', callback)
}

async function replyTweet(tweetId, { status, sketch, fileName }) {
  try {
    const { data } = await getTweetById(tweetId);
    const screenName = data.user.screen_name;
    let uploaded;
    let tweet = {
      in_reply_to_status_id: data.id_str, 
      status: `@${screenName}` 
    };
  
    if (fileName) {
      uploaded = await uploadImage(sketch, fileName);
      tweet.media_ids = [uploaded.data.media_id_string];
    }
    
    if (status) {
      tweet.status += ` ${status}`;
    }
  
    return await postTweet(tweet);
  } catch (error) {
    
  }
} 

module.exports = {
  tweetStatus,
  listenQuery,
  getTweetById,
  replyTweet,
  ID
}