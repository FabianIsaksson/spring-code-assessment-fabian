import { Application } from "express";
import fetch from "node-fetch";

const getUserData = async (
  access_token: string,
): Promise<SpotifyApi.UserObjectPrivate | null> => {
  let userData: SpotifyApi.UserObjectPrivate | null = null;

  try {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + access_token },
    });
    userData = (await response.json()) as SpotifyApi.UserObjectPrivate;
  } catch (e) {
    console.error(e);
  }

  return userData;
};

const playlistsApi = (app: Application) => {
  // Get user
  app.get("/user", async (req, res) => {
    const access_token = req.cookies.access_token;
    const userData = await getUserData(access_token);

    res.header("Access-Control-Allow-Credentials", "true");

    res.json(userData);
  });

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
        const data = await response.json();

        res.header("Access-Control-Allow-Credentials", "true");

        res.json(data);
      } else {
        console.log("Response status", response.status);
      }
    } catch (e) {
      console.error("Error fetching user playlists", e);
    }
  });

  // Get spotify featured playlists
  app.get("/featured-playlists", async (req, res) => {
    const access_token = req.cookies.access_token;

    try {
      const response = await fetch(
        "https://api.spotify.com/v1/browse/featured-playlists",
        {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        },
      );

      if (response.status === 200) {
        const data = await response.json();

        res.header("Access-Control-Allow-Credentials", "true");

        res.json(data);
      } else {
        console.log("Response status", response.status);
      }
    } catch (e) {
      console.error("Error fetching featured playlists", e);
    }
  });

  // Get playlist
  app.get("/playlist", async (req, res) => {
    const access_token = req.cookies.access_token;
    const playlistId = req.query.id;

    if (playlistId) {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/playlists/${playlistId}`,
          {
            headers: {
              Authorization: "Bearer " + access_token,
            },
          },
        );

        if (response.status === 200) {
          const data = await response.json();

          res.header("Access-Control-Allow-Credentials", "true");

          res.json(data);
        } else {
          console.log("Response status", response.status);
        }
      } catch (e) {
        console.error("Error fetching playlist", e);
      }
    }
  });

  // Add item to playlist
  app.post("/playlist-add-track", async (req, res) => {
    const access_token = req.cookies.access_token;
    const playlistId = req.query.id;
    const trackUri = req.query.track;

    if (playlistId && trackUri) {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + access_token,
            },
            body: JSON.stringify({
              uris: [trackUri],
              position: 0,
            }),
          },
        );

        if (response.status === 201) {
          const data = await response.json();

          res.header("Access-Control-Allow-Credentials", "true");

          res.json(data);
        } else {
          console.log("Response status", response);
        }
      } catch (e) {
        console.error("Error adding track to playlist", e);
      }
    }
  });

  // Create playlist
  app.post("/playlist-create", async (req, res) => {
    const access_token = req.cookies.access_token;
    const playlistName = req.query.name;
    const playlistDescription = req.query.description ?? "";

    const userData = await getUserData(access_token);

    if (playlistName) {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/users/${userData?.id}/playlists`,
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + access_token,
            },
            body: JSON.stringify({
              name: playlistName,
              description: playlistDescription,
              public: false,
            }),
          },
        );

        if (response.status === 201) {
          const data = await response.json();

          res.header("Access-Control-Allow-Credentials", "true");

          res.json(data);
        } else {
          console.log("Response status", response);
        }
      } catch (e) {
        console.error("Error adding track to playlist", e);
      }
    }
  });
};

export default playlistsApi;
