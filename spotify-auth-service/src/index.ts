import "dotenv/config";
import express from "express";
import cors from "cors";
import request from "request";
import crypto from "crypto";

const app = express();
app.use(cors());
const port = 4000;

// respond with current date
app.get("/ping", (req, res) => {
  res.send(`ping ${new Date().toISOString()}`);
});

var client_id = process.env.CLIENT_ID as string;
var redirect_uri = "http://localhost:4000/callback";

app.get("/login", function (req, res) {
  console.log("Recieved reqest");
  var state = crypto.randomBytes(20).toString("hex");
  var scope =
    "user-read-private user-read-email playlist-modify-private playlist-read-private playlist-read-collaborative playlist-modify-public user-library-read user-library-modify";

  const urlParams = new URLSearchParams({
    response_type: "code",
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state,
  });

  res.redirect(
    "https://accounts.spotify.com/authorize?" + urlParams.toString(),
  );
});

app.get("/callback", function (req, res) {
  console.log("performing callback");
  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    res.redirect(
      "/#" +
        new URLSearchParams({
          error: "state_mismatch",
        }).toString(),
    );
  } else {
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + process.env.CLIENT_SECRET).toString(
            "base64",
          ),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      console.log("TOKEN API RESPONSE", response);
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        var options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get(options, function (error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          "http://localhost:3000/#" +
            new URLSearchParams({
              access_token: access_token,
              refresh_token: refresh_token,
            }).toString(),
        );
      } else {
        console.error(error);

        res.redirect(
          "/#" +
            new URLSearchParams({
              error: "invalid_token",
            }).toString(),
        );
      }
    });
  }
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
