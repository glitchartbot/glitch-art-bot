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
      const fileName = tweetId;
      const chosenSketch = SketchesEnum.pixelSort;

      await myUtil.downloadImage(imageUrl, chosenSketch, fileName);

      myUtil.saveInfo(processing.getSetupFilePath(chosenSketch));
      const cmd = processing.getProcessingCmd(chosenSketch);
      await execAsync(cmd)

      // const reply = await bot.replyTweet(tweetId, {status: 'teste', fileName: `${fileName}.png`})
    } else {
      console.log('Não tem imagem');
    }
  } catch (error) {
    throw error;
  }

}

function main() {
  bot.listenQuery('@GlitchArtBot', onMention)
}

main();