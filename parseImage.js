const ImageParser = require('image-parser');

function getFirstGreenPixel(bigImage, yHeight) {
  let img = new ImageParser(Buffer.from(bigImage, "base64"));
  return new Promise((resolve, reject) => {
    img.parse(err => {
      if (err) {
        return reject(err);
      }
      for (var i = 0; i < img.width(); i++) {
        const pixel = img.getPixel(i, yHeight);
        if (
          pixel.r === 0 &&
          pixel.g === 255 &&
          pixel.b === 0 &&
          pixel.a === 1
        ) {
          // console.log(i, img.getPixel(i, yHeight));
          resolve(i - 1);
          break;
        }
      }
    });
  });
}

module.exports = getFirstGreenPixel;
