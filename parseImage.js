const getPixels = require("get-pixels");

function getFirstGreenPixel(bigImage, yHeight) {
  return new Promise((resolve, reject) => {
    // remove meta information for creating buffer
    const image = bigImage.replace(/^data:image\/\w+;base64,/, "");
    getPixels(Buffer.from(image, "base64"), "image/png", (err, pixels) => {
      if (err) {
        return reject(err);
      }
      // get-pixels returns ndarray which stores massive color information
      // https://www.npmjs.com/package/ndarray
      for (var i = 0; i < pixels.shape[0]; i++) {
        // the target is a green pixel
        // the distance from the pixel to left border is the answer

        // since we knew the height(yHeight)
        // we can easily find the pixel without scan from the top
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
    });
  });
}

module.exports = getFirstGreenPixel;
