require("dotenv").config();

const fetch = require("isomorphic-fetch");
const cookie = require("cookie");

async function get() {
  let JSESSIONID;
  return fetch(process.env.GET_IMAGE_ENDPOINT)
    .then(res => {
      const cookies = cookie.parse(res.headers.get("set-cookie"));
      JSESSIONID = cookies["JSESSIONID"];
      return res.json();
    })
    .then(json => {
      return {
        JSESSIONID,
        ...json
      };
    });
}

async function send(answer, JSESSIONID) {
  return fetch(`${process.env.SEND_ANSWER_ENDPOINT}${answer}`, {
    headers: {
      "content-type": "application/json",
      cookie: `JSESSIONID=${JSESSIONID}`
    },
    method: "GET"
  }).then(res => res.json());
}

module.exports = {
  get,
  send
};
