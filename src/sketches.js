const path = require('path');

const PROCESSING_PATH = {
  p2: 'C:\\Processing\\processing-2.2.1\\processing-java.exe',
  p3: 'C:\\Processing\\processing-3.5.4\\processing-java.exe'
}

const PROCESSING_SKETCHES_BASE = {
  p2: 'C:\\Processing\\sketches-p2',
  p3: 'C:\\Processing\\sketches-p3' 
}

const PROCESSING_SKETCHES = {
  pixelSort: {
    sketch: 'pixelsort',
    version: 'p3',
    data: 'pixelsort\\data',
    setup: 'pixelsort\\data\\setup.txt',
    assets: 'pixelsort\\assets',
  }
}

const SketchesEnum = {
  pixelSort: 'pixelSort'
}

const getVersion = sketch => PROCESSING_SKETCHES[sketch].version;

const getProcessingCmd = sketch => {
  const version = getVersion(sketch);

  return `${PROCESSING_PATH[version]} --sketch=${path.join(PROCESSING_SKETCHES_BASE[version], PROCESSING_SKETCHES[sketch].sketch)} --run`
}

const getAssetsPath = sketch => {
  const version = getVersion(sketch);

  return path.join(PROCESSING_SKETCHES_BASE[version], PROCESSING_SKETCHES[sketch].assets);
}


const getDataPath = sketch => {  
  const version = getVersion(sketch);

  return path.join(PROCESSING_SKETCHES_BASE[version], PROCESSING_SKETCHES[sketch].data);
}


const getSetupFilePath = sketch => {
  const version = getVersion(sketch);

  return path.join(PROCESSING_SKETCHES_BASE[version], PROCESSING_SKETCHES[sketch].setup)
}

const getSketch = sketch => ({...PROCESSING_SKETCHES[sketch]}) 

module.exports = {
  SketchesEnum,
  getProcessingCmd,
  getAssetsPath,
  getDataPath,
  getSetupFilePath,
  getSketch
}