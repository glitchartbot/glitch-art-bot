const path = require('path');

const PROCESSING_PATH = 'C:\\Processing\\processing-3.5.4\\processing-java.exe';
const PROCESSING_SKETCHES_BASE = 'C:\\Processing\\sketches-p3'; 
const PROCESSING_SKETCHES = {
  pixelSort: {
    sketch: 'pixelsort',
    data: 'pixelsort\\data',
    setup: 'pixelsort\\data\\setup.txt',
    assets: 'pixelsort\\assets',
  }
}
const SketchesEnum = {
  pixelSort: 'pixelSort'
}

const getProcessingCmd = sketch => `${PROCESSING_PATH} --sketch=${path.join(PROCESSING_SKETCHES_BASE, PROCESSING_SKETCHES[sketch].sketch)} --run`

const getAssetsPath = sketch => path.join(PROCESSING_SKETCHES_BASE, PROCESSING_SKETCHES[sketch].assets)

const getDataPath = sketch => path.join(PROCESSING_SKETCHES_BASE, PROCESSING_SKETCHES[sketch].data)

const getSetupFilePath = sketch => path.join(PROCESSING_SKETCHES_BASE, PROCESSING_SKETCHES[sketch].setup)

const getSketch = sketch => ({...PROCESSING_SKETCHES[sketch]}) 

module.exports = {
  SketchesEnum,
  getProcessingCmd,
  getAssetsPath,
  getDataPath,
  getSetupFilePath,
  getSketch
}