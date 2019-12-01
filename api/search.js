/** Created by Filip Drgoň on 01/12/2019. */

const queryString = require("query-string");
const fetch = require("node-fetch");
const cors = require("micro-cors")();

let token = null;

export default cors(async (req, res) => {
  const { q, since_id } = req.query;
  if (!token) {
    await fetchToken();
  }
  try {
    const response = await fetch(
      `https://api.twitter.com/1.1/search/tweets.json?${queryString.stringify({
        q,
        since_id,
        count: 5,
        result_type: "recent"
      })}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    const tweets = await response.json();
    await res.status(200).json(tweets);
  } catch (e) {
    console.log("Ruh roh", e);
    await res.status(400).json(e);
  }
});

const fetchToken = async () => {
  const response = await fetch("https://api.twitter.com/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        "WBXnBUjNkCHmTnq8jFhf44IbZ:um9BffLTlrB6k9ziAcaiQmrX8dJcvXu4BXPttmgFwdaBeVCUWR"
      ).toString("base64")}`,
      "Content-type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: "grant_type=client_credentials"
  });
  const json = await response.json();
  token = json.access_token;
};
