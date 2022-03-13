import { Application } from "express";
import fetch from "node-fetch";

type UserData = {
  country: string;
  display_name: string;
  email: string;
  explicit_content: { filter_enabled: boolean; filter_locked: boolean };
  external_urls: {
    spotify: string;
  };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: [];
  product: string;
  type: string;
  uri: string;
};

const getUserData = async (access_token: string): Promise<UserData | null> => {
  let userData: UserData | null = null;

  try {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + access_token },
    });
    userData = (await response.json()) as UserData;
  } catch (e) {
    console.error(e);
  }

  return userData;
};

const playlistsApi = (app: Application) => {
  // Get the users own playlists
  app.get("/user-playlists", async (req, res) => {
    const access_token = req.cookies.access_token;
    const userData = await getUserData(access_token);

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/users/${userData?.id}/playlists`,
        {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        },
      );

      if (response.status === 200) {
        const playlists = await response.json();

        res.header("Access-Control-Allow-Credentials", "true");

        res.json(playlists);
      } else {
        console.log("Response status", response.status);
      }
    } catch (e) {
      console.error("Error fetching user playlists", e);
    }
  });
};

export default playlistsApi;
