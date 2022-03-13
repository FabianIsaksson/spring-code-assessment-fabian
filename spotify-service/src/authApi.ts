import { Application } from "express";
import request from "request";
import crypto from "crypto";

const client_id = process.env.CLIENT_ID as string;
const redirect_uri = "http://localhost:4000/callback";

const authApi = (app: Application) => {
  app.get("/login", function (req, res) {
    const state = crypto.randomBytes(20).toString("hex");
    const scope =
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
    const code = req.query.code || null;
    const state = req.query.state || null;

    if (state === null) {
      res.redirect(
        "/#" +
          new URLSearchParams({
            error: "state_mismatch",
          }).toString(),
      );
    } else {
      const authOptions = {
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
        if (!error && response.statusCode === 200) {
          const access_token = body.access_token;
          const refresh_token = body.refresh_token;
          const expires_in = body.expires_in;

          res.cookie("access_token", access_token, {
            maxAge: expires_in * 1000,
          });
          res.cookie("refresh_token", refresh_token, {
            maxAge: expires_in * 1000,
          });

          // Return to client app
          res.redirect("http://localhost:3000");
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

  app.get("/refresh_token", function (req, res) {
    var refresh_token = req.cookies.refresh_token;
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + process.env.CLIENT_SECRET).toString(
            "base64",
          ),
      },
      form: {
        grant_type: "refresh_token",
        refresh_token: refresh_token,
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        const refresh_token = body.refresh_token;
        const expires_in = body.expires_in;

        res.cookie("access_token", access_token, {
          maxAge: expires_in,
          httpOnly: true,
        });
        res.cookie("refresh_token", refresh_token, {
          maxAge: expires_in,
          httpOnly: true,
        });

        // Return to client app
        res.redirect("http://localhost:3000");
      }
    });
  });
};

export default authApi;
