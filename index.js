const fs = require("fs");
const fetch = require("isomorphic-fetch");
const cookie = require("cookie");
const md5 = require("md5");

const map = require("./map.json");

let JSESSIONID;
let index;

const calc = async function() {
  await fetch("https://event.bn.live/api/slide/getImageVerifyCode")
    .then(res => {
      const cookies = cookie.parse(res.headers.get("set-cookie"));
      JSESSIONID = cookies["JSESSIONID"];
      return res.json();
    })
    .then(json => {
      const data = JSON.parse(json.data);
      index = md5(data.smallImage);
    });

  const answer = map[index] ? map[index] : Math.floor(Math.random() * 198) + 75;

  console.log(`q=${index}`);

  if (map[index]) {
    console.log(`answer=${answer}`);
  } else {
    console.log(`predict=${answer}`);
  }

  await fetch(
    `https://event.bn.live/api/hcFirm/updatePoll?id=89&moveLength=${answer}`,
    {
      headers: {
        "content-type": "application/json",
        cookie: `JSESSIONID=${JSESSIONID}`
      },
      method: "GET"
    }
  )
    .then(res => res.json())
    .then(json => {
      if (json.status === "1") {
        console.log(index, answer);
        console.log(json.info);
        map[index] = answer;
        fs.writeFileSync("map.json", JSON.stringify(map));
      }
    });

  return calc();
};

calc();
