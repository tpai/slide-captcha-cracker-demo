const getFirstGreenPixel = require("./parseImage");
const { get, send } = require("./api");

const start = async function() {
  const json = await get();
  const source = JSON.parse(json.data);
  const index = await getFirstGreenPixel(source.bigImage, source.yHeight);
  console.log(`answer=${index}`);
  const result = await send(index, json.JSESSIONID);
  console.log(result.info);

  return start();
};

try {
  start();
} catch (err) {
  console.log(err);
}
