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

    if (myUtil.hasValidImage(data) && tweet.in_reply_to_user_id_str != bot.ID) {
      //Baixa a imagem do tweet
      const imageUrl = myUtil.getImageUrl(data);
      const fileFormat = myUtil.getFileFormat(data);
      const chosenSketch = SketchesEnum.pixelSort;
      await myUtil.downloadImage(imageUrl, chosenSketch, { fileName: tweetId, fileFormat });

      //Salva as informações necessárias pra processar depois
      const sketchSetupPath = processing.getSetupFilePath(chosenSketch);
      myUtil.saveInfo(sketchSetupPath, `./assets/${tweetId}`, fileFormat);
      
      //Executa o comando que edita a imagem
      const cmd = processing.getProcessingCmd(chosenSketch);
      const { stdout, stderr } = await execAsync(cmd);
      
      //Responde o tweet que mencionou ele 
      const replyTweet = { 
        sketch: chosenSketch, 
        fileName: `${tweetId}_1${fileFormat}`
      }
      const reply = await bot.replyTweet(tweetId, replyTweet);

      myUtil.log({status: 'success', tweet, parent: data});
    } else {
      console.log('Imagem inválida');
      myUtil.log({status: 'error', tweet, parent: data});
    }
  } catch (error) {
    throw error;
  }

}

function main() {
  bot.listenQuery('@GlitchArtBot', onMention)
}

main();