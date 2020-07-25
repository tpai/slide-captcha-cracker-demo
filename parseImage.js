const getPixels = require("get-pixels");

function getFirstGreenPixel(bigImage, yHeight) {
  return new Promise((resolve, reject) => {
    getPixels(Buffer.from(bigImage, "base64"), "image/png", (err, pixels) => {
      if (err) {
        return reject(err);
      }
      for (var i = 0; i < pixels.shape[0]; i++) {
        // console.log(
        //   pixels.get(i, yHeight, 0),
        //   pixels.get(i, yHeight, 1),
        //   pixels.get(i, yHeight, 2),
        //   pixels.get(i, yHeight, 3)
        // );
        if (
          pixels.get(i, yHeight, 0) === 0 &&
          pixels.get(i, yHeight, 1) === 255 &&
          pixels.get(i, yHeight, 2) === 0 &&
          pixels.get(i, yHeight, 3) === 255
        ) {
          resolve(i - 1);
          break;
        }
      }
      resolve(0);
      // for (var i = 0; i < img.width(); i++) {
      //   const pixel = img.getPixel(i, yHeight);
      //   if (
      //     pixel.r === 0 &&
      //     pixel.g === 255 &&
      //     pixel.b === 0 &&
      //     pixel.a === 1
      //   ) {
      //     // console.log(i, img.getPixel(i, yHeight));
      //     resolve(i - 1);
      //     break;
      //   }
      // }
    });
  });
}

module.exports = getFirstGreenPixel;
