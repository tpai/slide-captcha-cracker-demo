const fs = require("fs");

const map = {};

for (var i = 0; i < 105; i++) {
  map[i] = -1;
}

fs.writeFileSync("map.json", JSON.stringify(map));
