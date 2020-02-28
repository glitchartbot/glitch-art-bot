const bot = require('./bot');
const myUtil = require('./util');
const processing = require('./sketches');
const { SketchesEnum } = processing;
const { promisify } = require('util');
const { exec } = require('child_process');
const execAsync = promisify(exec);


async function onMention(tweet) {
  try {
    const tweetId = tweet.id_str;
    const parentId = myUtil.getParentTweetId(tweet);
    const { data } = await bot.getTweetById(parentId);

    if (myUtil.hasValidImage(data)) {
      const imageUrl = myUtil.getImageUrl(data);
      const fileFormat = myUtil.getFileFormat(data);
      const chosenSketch = SketchesEnum.pixelSort;
      await myUtil.downloadImage(imageUrl, chosenSketch, { fileName: tweetId, fileFormat });

      const sketchSetupPath = processing.getSetupFilePath(chosenSketch);
      myUtil.saveInfo(sketchSetupPath, `./assets/${tweetId}`, fileFormat);
      
      const cmd = processing.getProcessingCmd(chosenSketch);
      const { stdout, stderr } = await execAsync(cmd);
      
      const replyTweet = { 
        sketch: chosenSketch, 
        fileName: `${tweetId}_1${fileFormat}`
      }
      const reply = await bot.replyTweet(tweetId, replyTweet)
    } else {
      console.log('Não tem imagem');
      myUtil.log({tweet, parent: data});
    }
  } catch (error) {
    throw error;
  }

}

function main() {
  bot.listenQuery('@GlitchArtBot', onMention)
}

main();