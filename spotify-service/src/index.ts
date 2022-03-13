import "dotenv/config";
import express from "express";
import cors from "cors";
import playlistsApi from "./playlists";
import cookies from "cookie-parser";
import authApi from "./authApi";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);
app.use(cookies());
const port = 4000;

// respond with current date
app.get("/ping", (req, res) => {
  res.send(`ping ${new Date().toISOString()}`);
});

// Authentication
authApi(app);

// Fetching of data
playlistsApi(app);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
